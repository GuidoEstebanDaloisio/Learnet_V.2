import { Response } from "express";
import { RequestConUsuario } from "../middleware/authMiddleware";
import { UsuarioModel } from "../models/Usuario";

export const obtenerPerfil = async (req: RequestConUsuario, res: Response) => {
  try {
    if (!req.usuario) {
      return res.status(401).json({ mensaje: "No autorizado" });
    }

    const usuario = await UsuarioModel.findById(req.usuario.id).select(
      "-password"
    );

    if (!usuario) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    return res.json(usuario);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensaje: "Error en el servidor" });
  }
};
