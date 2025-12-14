import api from "./axios";

/* ======================================================
   DISPONIBILIDAD BASE (horario laboral del mentor)
   ====================================================== */

/**
 * Obtiene el margen horario base del mentor autenticado
 * GET /api/disponibilidad/base
 */
export const obtenerDisponibilidadBase = () =>
  api.get<{
    _id: string;
    mentor: string;
    diasSemana: number[];
    horaDesde: string;
    horaHasta: string;
  }>("/disponibilidad/base");

/**
 * Crea o actualiza la disponibilidad base del mentor
 * POST /api/disponibilidad/base
 */
export const guardarDisponibilidadBase = (data: {
  diasSemana: number[];
  horaDesde: string; // "08:00"
  horaHasta: string; // "18:00"
}) =>
  api.post("/disponibilidad/base", data);

/* ======================================================
   EXCEPCIONES DE DISPONIBILIDAD (bloqueos)
   ====================================================== */

/**
 * Lista todas las excepciones del mentor autenticado
 * GET /api/disponibilidad/excepciones
 */
export const obtenerExcepciones = () =>
  api.get<
    {
      _id: string;
      mentor: string;
      fecha: string; // YYYY-MM-DD
      horaDesde: string;
      horaHasta: string;
      motivo?: string;
    }[]
  >("/disponibilidad/excepciones");

/**
 * Crea una nueva excepción de disponibilidad
 * POST /api/disponibilidad/excepciones
 */
export const crearExcepcion = (data: {
  fecha: string; // YYYY-MM-DD
  horaDesde: string;
  horaHasta: string;
  motivo?: string;
}) =>
  api.post("/disponibilidad/excepciones", data);

/* ======================================================
   SLOTS DISPONIBLES (disponibilidad calculada)
   ====================================================== */

/**
 * Obtiene los slots disponibles reales para un mentor y fecha
 * (usado por alumnos al solicitar mentoría)
 *
 * GET /api/disponibilidad/slots?mentorId=...&fecha=YYYY-MM-DD
 */
export const obtenerSlotsDisponibles = (params: {
  mentorId: string;
  fecha: string; // YYYY-MM-DD
}) =>
  api.get<
    {
      horaDesde: string;
      horaHasta: string;
    }[]
  >("/disponibilidad/slots", {
    params,
  });
