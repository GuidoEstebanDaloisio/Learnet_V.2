import { Request, Response } from "express";
import { SolicitudModel } from "../models/Solicitud";
import { RequestConUsuario } from "../middleware/authMiddleware";

// Crear una nueva solicitud
export const crearSolicitud = async (req: RequestConUsuario, res: Response) => {
  const { mentorId, mentoriaId, horario, mensaje } = req.body;

  if (!req.usuario) {
    return res.status(401).json({ mensaje: "No autenticado" });
  }

  if (!mentorId || !mentoriaId || !horario) {
    return res.status(400).json({ mensaje: "Faltan parámetros requeridos" });
  }

  try {
    // horario viene como "YYYY-MM-DD HH:MM - HH:MM"
    const fechaHora = horario.split(" ")[0]; // "YYYY-MM-DD"
    const fechaSolicitada = new Date(fechaHora);

    const solicitud = await SolicitudModel.create({
      alumno: req.usuario.id,
      mentor: mentorId,
      mentoria: mentoriaId,
      fechaSolicitada,
      mensajeOpcional: mensaje || "",
      estado: "pendiente",
    });

    res.status(201).json(solicitud);
  } catch (error) {
    console.error("Error creando solicitud:", error);
    res.status(500).json({ mensaje: "Error interno al crear la solicitud" });
  }
};

// Listar solicitudes de un alumno
export const listarSolicitudesAlumno = async (req: RequestConUsuario, res: Response) => {
  if (!req.usuario) {
    return res.status(401).json({ mensaje: "No autenticado" });
  }

  try {
    const solicitudes = await SolicitudModel.find({ alumno: req.usuario.id })
      .populate("mentor", "nombre apellido")
      .populate("mentoria", "titulo descripcion");

    res.json(solicitudes);
  } catch (error) {
    console.error("Error listando solicitudes:", error);
    res.status(500).json({ mensaje: "Error interno al listar solicitudes" });
  }
};
