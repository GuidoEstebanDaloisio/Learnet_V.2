import { DisponibilidadBaseModel } from "../models/DisponibilidadBase";
import { ExcepcionDisponibilidadModel } from "../models/ExcepcionDisponibilidad";
import { Types } from "mongoose";

// --- Tipos de la Interfaz del Service ---
interface Slot {
  horaDesde: string;
  horaHasta: string;
}

interface Params {
  mentorId: Types.ObjectId | string;
  fecha: string; // YYYY-MM-DD
  duracionSesion: number; // minutos
}

// --- Helpers (Funciones Puras de Lógica) ---
/** Convierte "HH:MM" a minutos desde la medianoche. */
const timeToMinutes = (time: string): number => {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
};

/** Convierte minutos desde la medianoche a "HH:MM". */
const minutesToTime = (min: number): string => {
  const h = Math.floor(min / 60);
  const m = min % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
};

/** Genera todos los slots posibles dentro de un rango y duración. */
const generarSlots = (
  desde: string,
  hasta: string,
  duracion: number
): Slot[] => {
  const slots: Slot[] = [];

  let actual = timeToMinutes(desde);
  const fin = timeToMinutes(hasta);

  while (actual + duracion <= fin) {
    slots.push({
      horaDesde: minutesToTime(actual),
      horaHasta: minutesToTime(actual + duracion),
    });
    actual += duracion;
  }

  return slots;
};

/** Verifica si dos rangos de tiempo se solapan. */
const solapan = (
  aDesde: string,
  aHasta: string,
  bDesde: string,
  bHasta: string
): boolean => {
  const a1 = timeToMinutes(aDesde);
  const a2 = timeToMinutes(aHasta);
  const b1 = timeToMinutes(bDesde);
  const b2 = timeToMinutes(bHasta);

  // Solapan si (A comienza antes de que B termine) Y (B comienza antes de que A termine)
  return a1 < b2 && b1 < a2;
};

// --- Función Principal del Service ---
export const getSlotsDisponibles = async ({
  mentorId,
  fecha,
  duracionSesion,
}: Params): Promise<Slot[]> => {
  // 1️⃣ obtener disponibilidad base
  const base = await DisponibilidadBaseModel.findOne({ mentor: mentorId });
  if (!base) return [];

  const fechaDate = new Date(fecha);
  // getDay() devuelve 0 (domingo) a 6 (sábado)
  const diaSemana = fechaDate.getDay();

  // 2️⃣ validar que el mentor trabaje ese día
  if (!base.diasSemana.includes(diaSemana)) {
    return [];
  }

  // 3️⃣ generar slots base
  const slotsBase = generarSlots(
    base.horaDesde,
    base.horaHasta,
    duracionSesion
  );

  // 4️⃣ obtener excepciones de ese día
  // IMPORTANTE: Mongoose puede manejar la fecha como string "YYYY-MM-DD"
  const excepciones = await ExcepcionDisponibilidadModel.find({
    mentor: mentorId,
    fecha,
  });

  // 5️⃣ filtrar slots ocupados
  const slotsDisponibles = slotsBase.filter((slot) => {
    // Si algún slot de excepción SOLAPA el slot base, entonces el slot base está ocupado.
    return !excepciones.some((ex) =>
      solapan(slot.horaDesde, slot.horaHasta, ex.horaDesde, ex.horaHasta)
    );
  });

  return slotsDisponibles;
};