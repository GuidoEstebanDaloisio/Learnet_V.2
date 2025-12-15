import { Request, Response } from "express";
import { RequestConUsuario } from "../middleware/authMiddleware";
import { DisponibilidadBaseModel } from "../models/DisponibilidadBase";
import { IndisposicionModel } from "../models/Indisposicion";
import { getSlotsDisponibles, getSlotsDisponiblesRango, contarSlotsDisponibles } from "../services/disponibilidadService";

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


// Obtener la disponibilidad base de un mentor por ID
export const obtenerDisponibilidadMentorPorId = async (req: Request, res: Response) => {
  const mentorId = req.params.id;

  if (!mentorId) {
    return res.status(400).json({ mensaje: "Falta el ID del mentor." });
  }

  try {
    const disponibilidadBase = await DisponibilidadBaseModel.findOne({
      mentor: mentorId,
    });

    if (!disponibilidadBase) {
      return res.status(404).json({ mensaje: "El mentor no tiene disponibilidad configurada." });
    }

    res.json(disponibilidadBase);
  } catch (error) {
    console.error("Error obteniendo disponibilidad del mentor:", error);
    res.status(500).json({ mensaje: "Error interno al obtener disponibilidad." });
  }
};

//Crear indisposicion (bloqueo)
export const crearIndisposicion = async (
  req: RequestConUsuario,
  res: Response
) => {
  const { fecha, horaDesde, horaHasta, motivo } = req.body;

  if (!req.usuario) {
    return res.status(401).json({ mensaje: "No autenticado" });
  }

  const indisposicion = await IndisposicionModel.create({
    mentor: req.usuario.id,
    fecha,
    horaDesde,
    horaHasta,
    motivo,
  });

  res.status(201).json(indisposicion);
};

//Obtener indisposiciones del mentor
export const listarIndisposiciones = async (
  req: RequestConUsuario,
  res: Response
) => {
  const indisposiciones = await IndisposicionModel.find({
    mentor: req.usuario?.id,
  }).sort({ fecha: 1, horaDesde: 1 });

  res.json(indisposiciones);
};

export const obtenerSlotsDisponiblesRango = async (req: Request, res: Response) => {
  const { mentorId, desde, hasta } = req.query;

  if (!mentorId || !desde || !hasta) {
    return res.status(400).json({ mensaje: "Faltan parámetros requeridos." });
  }

  try {
    const slots = await getSlotsDisponiblesRango(
      mentorId.toString(),
      new Date(desde.toString()),
      new Date(hasta.toString())
    );

    res.json(slots);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error obteniendo slots disponibles." });
  }
};

// Controlador para obtener la cantidad de turnos disponibles de un mentor
export const obtenerCantidadSlotsDisponibles = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ mensaje: "Falta el ID del mentor." });
  }

  try {
    const cantidad = await contarSlotsDisponibles(id);
    res.json({ cantidad });
  } catch (error) {
    console.error("Error obteniendo cantidad de slots:", error);
    res.status(500).json({ mensaje: "Error interno al obtener slots disponibles." });
  }
};