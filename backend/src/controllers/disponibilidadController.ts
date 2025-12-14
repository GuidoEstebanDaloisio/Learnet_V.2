import { Request, Response } from "express";
import { RequestConUsuario } from "../middleware/authMiddleware";
import { DisponibilidadBaseModel } from "../models/DisponibilidadBase";
import { ExcepcionDisponibilidadModel } from "../models/ExcepcionDisponibilidad";
import { getSlotsDisponibles } from "../services/disponibilidadService";

export const obtenerSlotsDisponibles = async (
  req: Request,
  res: Response
) => {
  // ⚠️ Los parámetros vienen como string por defecto en req.query
  const { mentorId, fecha } = req.query;

  // Validación básica de parámetros
  if (!mentorId || typeof mentorId !== 'string' || !fecha || typeof fecha !== 'string') {
    return res.status(400).json({ 
      mensaje: "Faltan parámetros requeridos (mentorId y fecha) o son inválidos." 
    });
  }

  try {
    // Llamada al service. El Controller solo media y adapta la entrada/salida.
    const slots = await getSlotsDisponibles({
      mentorId: mentorId,
      fecha: fecha,
      // La duración se puede hardcodear, o tomarla de req.query si es variable.
      duracionSesion: 60, // Ejemplo: Sesiones de 60 minutos
    });

    res.json(slots);
  } catch (error) {
    console.error("Error al obtener slots disponibles:", error);
    res.status(500).json({ 
      mensaje: "Ocurrió un error interno al buscar la disponibilidad." 
    });
  }
};

//Crear o actualizar disponibilidad base
export const upsertDisponibilidadBase = async (
  req: RequestConUsuario,
  res: Response
) => {
  const { diasSemana, horaDesde, horaHasta } = req.body;

  if (!req.usuario) {
    return res.status(401).json({ mensaje: "No autenticado" });
  }

  const disponibilidad = await DisponibilidadBaseModel.findOneAndUpdate(
    { mentor: req.usuario.id },
    {
      mentor: req.usuario.id,
      diasSemana,
      horaDesde,
      horaHasta,
    },
    { upsert: true, new: true }
  );

  res.json(disponibilidad);
};

//Obtener disponibilidad base del mentor
export const obtenerDisponibilidadBase = async (
  req: RequestConUsuario,
  res: Response
) => {
  const disponibilidad = await DisponibilidadBaseModel.findOne({
    mentor: req.usuario?.id,
  });

  res.json(disponibilidad);
};

//Crear excepción (bloqueo)
export const crearExcepcion = async (
  req: RequestConUsuario,
  res: Response
) => {
  const { fecha, horaDesde, horaHasta, motivo } = req.body;

  if (!req.usuario) {
    return res.status(401).json({ mensaje: "No autenticado" });
  }

  const excepcion = await ExcepcionDisponibilidadModel.create({
    mentor: req.usuario.id,
    fecha,
    horaDesde,
    horaHasta,
    motivo,
  });

  res.status(201).json(excepcion);
};

//Obtener excepciones del mentor
export const listarExcepciones = async (
  req: RequestConUsuario,
  res: Response
) => {
  const excepciones = await ExcepcionDisponibilidadModel.find({
    mentor: req.usuario?.id,
  }).sort({ fecha: 1, horaDesde: 1 });

  res.json(excepciones);
};
