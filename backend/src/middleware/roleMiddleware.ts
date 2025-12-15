import { Response, NextFunction } from "express";
import { RequestConUsuario } from "./authMiddleware";
import { ROLES } from "../constants/roles";

// Verificar rol de usuario y permitir acceso según roles permitidos
export const roleMiddleware =
  (...rolesPermitidos: string[]) =>
  (req: RequestConUsuario, res: Response, next: NextFunction) => {
    try {
      // Verificar que el usuario esté autenticado
      if (!req.usuario) {
        return res.status(401).json({ mensaje: "No autenticado" });
      }

      const tipoUsuario = req.usuario.tipo;

      // Verificar que el rol del usuario esté permitido
      if (!rolesPermitidos.includes(tipoUsuario)) {
        return res
          .status(403)
          .json({ mensaje: "No tienes permisos para esta acción" });
      }

      // Permitir continuar al siguiente middleware
      next();
    } catch (error) {
      console.error(error);
      return res.status(500).json({ mensaje: "Error en el servidor" });
    }
  };
