import api from "./axios";

export const obtenerPerfil = async () => {
  return api.get("/usuario/perfil");
};

export const listarMentores = async () => {
  return api.get("/usuario/mentores");
};

export const obtenerMentorPorId = async (id: string) => {
  return api.get(`/usuario/mentores/${id}`);
};

export const actualizarDisponibilidad = async (estaDisponible: boolean) => {
  return api.patch("/usuario/disponibilidad", { estaDisponible });
};
