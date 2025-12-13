import api from "./axios";

export const obtenerPerfil = async () => {
  return api.get("/usuario/perfil");
};
