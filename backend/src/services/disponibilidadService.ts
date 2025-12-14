import { DisponibilidadBaseModel } from "../models/DisponibilidadBase";
// ❌ ANTES: import { ExcepcionDisponibilidadModel } from "../models/ExcepcionDisponibilidad";
// ✅ AHORA:
import { IndisposicionModel } from "../models/Indisposicion";
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

interface ProximoSlot extends Slot {
  fecha: string; // YYYY-MM-DD
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

  // 4️⃣ obtener indisposiciones (antes excepciones) de ese día
  const indisposiciones = await IndisposicionModel.find({ // 👈 Cambiado el nombre del modelo
    mentor: mentorId,
    fecha,
  });

  // 5️⃣ filtrar slots ocupados
  const slotsDisponibles = slotsBase.filter((slot) => {
    // Si algún slot de indisposición SOLAPA el slot base, entonces el slot base está ocupado.
    return !indisposiciones.some((indisposicion) => // 👈 Cambiado el nombre de la variable
      solapan(slot.horaDesde, slot.horaHasta, indisposicion.horaDesde, indisposicion.horaHasta)
    );
  });

  return slotsDisponibles;
};

export const obtenerProximoSlot = async (mentorId: string): Promise<ProximoSlot | null> => { // 👈 Añadida tipificación para mejor claridad
  const base = await DisponibilidadBaseModel.findOne({ mentor: mentorId });
  if (!base) return null;

  const hoy = new Date();
  for (let i = 0; i < 30; i++) { // buscamos slots de los próximos 30 días
    const fecha = new Date();
    fecha.setDate(hoy.getDate() + i);
    const diaSemana = fecha.getDay();

    if (!base.diasSemana.includes(diaSemana)) continue;

    const slotsBase = generarSlots(base.horaDesde, base.horaHasta, base.duracionSesion || 60);

    // Obtener indisposiciones (antes excepciones) del día
    const indisposiciones = await IndisposicionModel.find({ // 👈 Cambiado el nombre del modelo
      mentor: mentorId,
      fecha: fecha.toISOString().split("T")[0],
    });

    const slotsDisponibles = slotsBase.filter((slot) =>
      !indisposiciones.some((indisposicion) => // 👈 Cambiado el nombre de la variable
        solapan(slot.horaDesde, slot.horaHasta, indisposicion.horaDesde, indisposicion.horaHasta)
      )
    );

    if (slotsDisponibles.length > 0) {
      return {
        fecha: fecha.toISOString().split("T")[0],
        ...slotsDisponibles[0],
      };
    }
  }

  return null; // ningún slot disponible en los próximos 30 días
};