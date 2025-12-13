import api from "./axios";

export const registrarUsuario = async (data: any) => {
  return api.post("/auth/register", data);
};

export const loginUsuario = async (data: { email: string; password: string }) => {
  return api.post("/auth/login", data);
};
