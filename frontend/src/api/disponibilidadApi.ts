import api from "./axios";

// obtiene el próximo slot disponible de un mentor
export const obtenerProximaDisponibilidadMentor = (mentorId: string) =>
  api.get<{
    fecha: string;      // YYYY-MM-DD
    horaDesde: string;  // HH:MM
    horaHasta: string;  // HH:MM
  }>(`/disponibilidad/${mentorId}/proxima-disponibilidad`);


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
  horaDesde: string; // "08:00"
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

