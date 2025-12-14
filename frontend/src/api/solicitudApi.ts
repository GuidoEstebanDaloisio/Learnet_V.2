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

// Listar solicitudes del alumno autenticado
export const listarSolicitudesAlumno = () => {
  return api.get("/solicitudes");
};


export const listarSolicitudesMentor = () => {
  return api.get("/solicitudes/mentor");
};

