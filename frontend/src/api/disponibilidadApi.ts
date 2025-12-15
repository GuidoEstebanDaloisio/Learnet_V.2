import api from "./axios";

// Obtener todos los slots de un mentor entre dos fechas
export const obtenerSlotsDisponiblesRango = (params: {
  mentorId: string;
  desde: string; // YYYY-MM-DD
  hasta: string; // YYYY-MM-DD
}) =>
  api.get<
    {
      fecha: string; // YYYY-MM-DD
      slots: { horaDesde: string; horaHasta: string }[];
    }[]
  >("/disponibilidad/slots/rango", { params });
  

export const obtenerDisponibilidadBase = () =>
  api.get<{
    _id: string;
    mentor: string;
    diasSemana: number[];
    horaDesde: string;
    horaHasta: string;
  }>("/disponibilidad/base");

    export const obtenerDisponibilidadPorId = (mentorId: string) =>
  api.get<{
    _id: string;
    mentor: string;
    diasSemana: number[];
    horaDesde: string;
    horaHasta: string;
  }>(`/disponibilidad/${mentorId}/base`);

export const guardarDisponibilidadBase = (data: {
  diasSemana: number[];
  horaDesde: string; // ej. "08:00"
  horaHasta: string; // "18:00"
}) =>
  api.post("/disponibilidad/base", data);

export const obtenerIndisposiciones = () =>
  api.get<
    {
      _id: string;
      mentor: string;
      fecha: string; // YYYY-MM-DD
      horaDesde: string;
      horaHasta: string;
      motivo?: string;
    }[]
  >("/disponibilidad/indisposiciones");

export const crearIndisposicion = (data: {
  fecha: string; // YYYY-MM-DD
  horaDesde: string;
  horaHasta: string;
  motivo?: string;
}) =>
  api.post("/disponibilidad/indisposiciones", data);

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

export const obtenerCantidadSlotsDisponibles = (mentorId: string) =>
  api.get<{ cantidad: number }>(`/disponibilidad/mentor/${mentorId}/cantidad-slots`);