import { DisponibilidadBaseModel } from "../models/DisponibilidadBase";
import { IndisposicionModel } from "../models/Indisposicion";
import { Types } from "mongoose";

// --- Tipos ---
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
// --- Helpers de tiempo y slots ---

// Convertir hora "HH:MM" a minutos totales
const timeToMinutes = (time: string): number => {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
};

// Convertir minutos totales a hora "HH:MM"
const minutesToTime = (min: number): string => {
  const h = Math.floor(min / 60);
  const m = min % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
};

// Formatear fecha a YYYY-MM-DD en zona horaria local
const formatFechaLocal = (d: Date) => {
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
};

// Generar slots entre horas desde y hasta según duración
const generarSlots = (desde: string, hasta: string, duracion: number): Slot[] => {
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

// Verificar solapamiento entre dos rangos de tiempo
const solapan = (aDesde: string, aHasta: string, bDesde: string, bHasta: string): boolean => {
  const a1 = timeToMinutes(aDesde);
  const a2 = timeToMinutes(aHasta);
  const b1 = timeToMinutes(bDesde);
  const b2 = timeToMinutes(bHasta);
  return a1 < b2 && b1 < a2;
};

// --- Funciones principales ---

// Obtener slots disponibles de un mentor en un día
export const getSlotsDisponibles = async ({ mentorId, fecha, duracionSesion }: Params): Promise<Slot[]> => {
  const base = await DisponibilidadBaseModel.findOne({ mentor: mentorId });
  if (!base) return [];

  const fechaDate = new Date(fecha);
  const diaSemana = fechaDate.getDay();
  if (!base.diasSemana.includes(diaSemana)) return [];

  const slotsBase = generarSlots(base.horaDesde, base.horaHasta, duracionSesion);

  const indisposiciones = await IndisposicionModel.find({
    mentor: mentorId,
    fecha: formatFechaLocal(fechaDate),
  });

  // Filtrar slots que no se solapen con indisposiciones
  const slotsDisponibles = slotsBase.filter(slot =>
    !indisposiciones.some(ind =>
      solapan(slot.horaDesde, slot.horaHasta, ind.horaDesde, ind.horaHasta)
    )
  );

  return slotsDisponibles;
};

// Contar slots disponibles de un mentor en un rango de días
export const contarSlotsDisponibles = async (
  mentorId: string,
  dias = 30
): Promise<number> => {
  const base = await DisponibilidadBaseModel.findOne({ mentor: mentorId });
  if (!base) return 0;

  let totalSlots = 0;
  const hoy = new Date();

  for (let i = 0; i < dias; i++) {
    const fecha = new Date();
    fecha.setDate(hoy.getDate() + i);

    const diaSemana = fecha.getDay();
    if (!base.diasSemana.includes(diaSemana)) continue;

    const slotsBase = generarSlots(base.horaDesde, base.horaHasta, base.duracionSesion || 60);

    const indisposiciones = await IndisposicionModel.find({
      mentor: mentorId,
      fecha: formatFechaLocal(fecha),
    });

    const slotsDisponibles = slotsBase.filter(slot =>
      !indisposiciones.some(ind => solapan(slot.horaDesde, slot.horaHasta, ind.horaDesde, ind.horaHasta))
    );

    totalSlots += slotsDisponibles.length;
  }

  return totalSlots;
};

// Obtener slots disponibles de un mentor en un rango de fechas
export const getSlotsDisponiblesRango = async (mentorId: string, desde: Date, hasta: Date): Promise<{ fecha: string; slots: Slot[] }[]> => {
  const base = await DisponibilidadBaseModel.findOne({ mentor: mentorId });
  if (!base) return [];

  const resultados: { fecha: string; slots: Slot[] }[] = [];
  const duracionSesion = base.duracionSesion || 60;

  for (let d = new Date(desde); d <= hasta; d.setDate(d.getDate() + 1)) {
    const diaSemana = d.getDay();
    if (!base.diasSemana.includes(diaSemana)) continue;

    const slotsBase = generarSlots(base.horaDesde, base.horaHasta, duracionSesion);

    const indisposiciones = await IndisposicionModel.find({
      mentor: mentorId,
      fecha: formatFechaLocal(d),
    });

    const slotsDisponibles = slotsBase.filter(slot =>
      !indisposiciones.some(ind => solapan(slot.horaDesde, slot.horaHasta, ind.horaDesde, ind.horaHasta))
    );

    resultados.push({ fecha: formatFechaLocal(d), slots: slotsDisponibles });
  }

  return resultados;
};
