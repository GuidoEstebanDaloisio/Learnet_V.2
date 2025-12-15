import { Response } from "express";
import { SolicitudModel } from "../models/Solicitud";
import { RequestConUsuario } from "../middleware/authMiddleware";

// Crear una nueva solicitud
export const crearSolicitud = async (
  req: RequestConUsuario,
  res: Response
) => {
  const { mentorId, mentoriaId, horario, mensaje } = req.body;

  if (!req.usuario) {
    return res.status(401).json({ mensaje: "No autenticado" });
  }

  if (!mentorId || !mentoriaId || !horario) {
    return res.status(400).json({ mensaje: "Faltan parámetros requeridos" });
  }

  try {
    // Formato esperado: "YYYY-MM-DD HH:MM - HH:MM"
    const partes = horario.split(" ");
    // ["YYYY-MM-DD", "HH:MM", "-", "HH:MM"]

    if (partes.length !== 4 || partes[2] !== "-") {
      return res
        .status(400)
        .json({ mensaje: "Formato de horario inválido" });
    }

    const fechaStr = partes[0];
    const horaDesdeStr = partes[1];
    const horaHastaStr = partes[3];

    const [anio, mes, dia] = fechaStr.split("-").map(Number);
    const [hDesde, mDesde] = horaDesdeStr.split(":").map(Number);
    const [hHasta, mHasta] = horaHastaStr.split(":").map(Number);

    // FECHAS EN HORA LOCAL
    const fechaDesde = new Date(anio, mes - 1, dia, hDesde, mDesde, 0, 0);
    const fechaHasta = new Date(anio, mes - 1, dia, hHasta, mHasta, 0, 0);

    if (fechaHasta <= fechaDesde) {
      return res
        .status(400)
        .json({ mensaje: "El horario hasta debe ser posterior al desde" });
    }

    const solicitud = await SolicitudModel.create({
      alumno: req.usuario.id,
      mentor: mentorId,
      mentoria: mentoriaId,
      fechaDesde,
      fechaHasta,
      mensajeOpcional: mensaje || "",
      estado: "pendiente",
    });

    res.status(201).json(solicitud);
  } catch (error) {
    console.error("Error creando solicitud:", error);
    res
      .status(500)
      .json({ mensaje: "Error interno al crear la solicitud" });
  }
};

// Aceptar solicitud
export const aceptarSolicitud = async (
  req: RequestConUsuario,
  res: Response
) => {
  const { id } = req.params;

  if (!req.usuario) {
    return res.status(401).json({ mensaje: "No autenticado" });
  }

  try {
    const solicitud = await SolicitudModel.findById(id);

    if (!solicitud) {
      return res.status(404).json({ mensaje: "Solicitud no encontrada" });
    }

    // Validar que el mentor sea el dueño
    if (solicitud.mentor.toString() !== req.usuario.id) {
      return res.status(403).json({ mensaje: "No autorizado" });
    }

    // Solo se puede aceptar si está pendiente
    if (solicitud.estado !== "pendiente") {
      return res
        .status(400)
        .json({ mensaje: "La solicitud ya fue procesada" });
    }

    solicitud.estado = "aceptada";
    await solicitud.save();

    res.json(solicitud);
  } catch (error) {
    console.error("Error aceptando solicitud:", error);
    res.status(500).json({ mensaje: "Error al aceptar solicitud" });
  }
};


// Rechazar solicitud
export const rechazarSolicitud = async (req: RequestConUsuario, res: Response) => {
  const { id } = req.params;

  if (!req.usuario) {
    return res.status(401).json({ mensaje: "No autenticado" });
  }

  try {
    const solicitud = await SolicitudModel.findById(id);

    if (!solicitud) {
      return res.status(404).json({ mensaje: "Solicitud no encontrada" });
    }

    // Opcional: validar que el mentor sea el dueño
    if (solicitud.mentor.toString() !== req.usuario.id) {
      return res.status(403).json({ mensaje: "No autorizado" });
    }

    solicitud.estado = "rechazada";
    await solicitud.save();

    res.json(solicitud);
  } catch (error) {
    console.error("Error rechazando solicitud:", error);
    res.status(500).json({ mensaje: "Error al rechazar solicitud" });
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

// Listar solicitudes recibidas por el mentor
export const listarSolicitudesMentor = async (req: RequestConUsuario, res: Response) => {
  if (!req.usuario) {
    return res.status(401).json({ mensaje: "No autenticado" });
  }

  try {
    const solicitudes = await SolicitudModel.find({ mentor: req.usuario.id })
  .populate("alumno", "nombre apellido")
  .populate({
    path: "mentoria",
    populate: {
      path: "tema",
      select: "nombre",
    },
  });


    res.json(solicitudes);
  } catch (error) {
    console.error("Error listando solicitudes del mentor:", error);
    res.status(500).json({ mensaje: "Error interno al listar solicitudes" });
  }
};