import api from "./axios";

export const crearMentoria = (data: { titulo: string; descripcion: string; tema: string }) => {
  return api.post("/mentorias", data);
};

export const listarMentorias = () => {
  return api.get("/mentorias");
};

export const listarMentoriasDelMentor = () => {
  return api.get("/mentorias/mias");
};

export const listarTemas = () => {
  return api.get("/temas");
};

export const obtenerMentoriaPorId = (id: string) => {
  return api.get(`/mentorias/${id}`);
};

export const editarMentoria = (
  id: string,
  data: { titulo: string; descripcion: string; tema: string }
) => {
  return api.put(`/mentorias/${id}`, data);
};