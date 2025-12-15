import api from "./axios";

interface CrearSolicitudData {
  mentorId: string;
  mentoriaId: string;
  horario: string; // "YYYY-MM-DD HH:MM - HH:MM"
  mensaje?: string;
}

// Crear solicitud de mentoría
export const crearSolicitud = (data: CrearSolicitudData) => {
  return api.post("/solicitudes", data);
};

export const rechazarSolicitud = (id: string) => {
  return api.patch(`/solicitudes/${id}/rechazar`);
};

export const aceptarSolicitud = (id: string) => {
  return api.patch(`/solicitudes/${id}/aceptar`);
};

// Listar solicitudes del alumno autenticado
export const listarSolicitudesAlumno = () => {
  return api.get("/solicitudes");
};


export const listarSolicitudesMentor = () => {
  return api.get("/solicitudes/mentor");
};

