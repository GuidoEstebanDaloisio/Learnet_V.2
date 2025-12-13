import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface RequestConUsuario extends Request {
  usuario?: {
    id: string;
    tipo: string;
  };
}

export const authMiddleware = (
  req: RequestConUsuario,
  res: Response,
  next: NextFunction
) => {
  try {
    const header = req.headers.authorization;

    // No mandó token
    if (!header) {
      return res.status(401).json({ mensaje: "No se proporcionó token" });
    }

    // El formato debe ser: "Bearer tokenxxxx"
    const token = header.split(" ")[1];

    if (!token) {
      return res.status(401).json({ mensaje: "Token inválido" });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as { id: string; tipo: string };

    // Injecta el usuario en la request
    req.usuario = {
      id: decoded.id,
      tipo: decoded.tipo,
    };

    next(); // sigue a la ruta
  } catch (error) {
    console.error(error);
    return res.status(401).json({ mensaje: "Token inválido o expirado" });
  }
};
