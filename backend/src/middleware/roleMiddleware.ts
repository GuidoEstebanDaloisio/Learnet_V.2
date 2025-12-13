import { Response, NextFunction } from "express";
import { RequestConUsuario } from "./authMiddleware";
import { ROLES } from "../constants/roles";

export const roleMiddleware =
  (...rolesPermitidos: string[]) =>
  (req: RequestConUsuario, res: Response, next: NextFunction) => {
    try {
      if (!req.usuario) {
        return res.status(401).json({ mensaje: "No autenticado" });
      }

      const tipoUsuario = req.usuario.tipo;

      if (!rolesPermitidos.includes(tipoUsuario)) {
        return res
          .status(403)
          .json({ mensaje: "No tienes permisos para esta acción" });
      }

      next();
    } catch (error) {
      console.error(error);
      return res.status(500).json({ mensaje: "Error en el servidor" });
    }
  };
