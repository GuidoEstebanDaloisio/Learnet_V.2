import api from "./axios";

// Crear sesión desde una solicitud aceptada
export const crearSesionDesdeSolicitud = (solicitudId: string) => {
  return api.post(`/sesiones-asesoria/crear/${solicitudId}`);
};

export const listarSesionesMentor = () => {
  return api.get("/sesiones-asesoria/mentor");
};


export const listarSesionesAlumno = () => {
  return api.get("/sesiones-asesoria/alumno");
};

export const actualizarLinkSesion = (id: string, linkMeet: string) => {
  return api.patch(`/sesiones-asesoria/${id}/link`, { linkMeet });
};