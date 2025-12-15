import { Request, Response } from "express";
import { RequestConUsuario } from "../middleware/authMiddleware";
import { DisponibilidadBaseModel } from "../models/DisponibilidadBase";
import { IndisposicionModel } from "../models/Indisposicion";
import { getSlotsDisponibles, getSlotsDisponiblesRango, contarSlotsDisponibles } from "../services/disponibilidadService";

export const obtenerSlotsDisponibles = async (
  req: Request,
  res: Response
) => {
  // Tomar los parámetros mentorId y fecha desde req.query
  const { mentorId, fecha } = req.query;

  // Validar que existan y sean strings
  if (!mentorId || typeof mentorId !== 'string' || !fecha || typeof fecha !== 'string') {
    return res.status(400).json({ 
      mensaje: "Faltan parámetros requeridos (mentorId y fecha) o son inválidos." 
    });
  }

  try {
    // Llamar al service para obtener slots disponibles
    const slots = await getSlotsDisponibles({
      mentorId: mentorId,
      fecha: fecha,
      duracionSesion: 60, // Definir duración de sesión
    });

    // Devolver los slots al cliente
    res.json(slots);
  } catch (error) {
    console.error("Error al obtener slots disponibles:", error);
    // Devolver error 500 en caso de fallo
    res.status(500).json({ 
      mensaje: "Ocurrió un error interno al buscar la disponibilidad." 
    });
  }
};

// Crear o actualizar disponibilidad base
export const upsertDisponibilidadBase = async (
  req: RequestConUsuario,
  res: Response
) => {
  const { diasSemana, horaDesde, horaHasta } = req.body;

  // Verificar que el usuario esté autenticado
  if (!req.usuario) {
    return res.status(401).json({ mensaje: "No autenticado" });
  }

  // Buscar y actualizar o crear disponibilidad base
  const disponibilidad = await DisponibilidadBaseModel.findOneAndUpdate(
    { mentor: req.usuario.id },
    {
      mentor: req.usuario.id,
      diasSemana,
      horaDesde,
      horaHasta,
    },
    { upsert: true, new: true } // Crear si no existe, devolver documento actualizado
  );

  // Devolver la disponibilidad resultante
  res.json(disponibilidad);
};

// Obtener disponibilidad base del mentor autenticado
export const obtenerDisponibilidadBase = async (
  req: RequestConUsuario,
  res: Response
) => {
  // Buscar disponibilidad base por ID de mentor
  const disponibilidad = await DisponibilidadBaseModel.findOne({
    mentor: req.usuario?.id,
  });

  // Devolver la disponibilidad
  res.json(disponibilidad);
};

// Obtener disponibilidad de un mentor por ID
export const obtenerDisponibilidadMentorPorId = async (req: Request, res: Response) => {
  const mentorId = req.params.id;

  // Validar que se haya pasado el ID
  if (!mentorId) {
    return res.status(400).json({ mensaje: "Falta el ID del mentor." });
  }

  try {
    // Buscar disponibilidad base del mentor
    const disponibilidadBase = await DisponibilidadBaseModel.findOne({
      mentor: mentorId,
    });

    // Devolver 404 si no existe
    if (!disponibilidadBase) {
      return res.status(404).json({ mensaje: "El mentor no tiene disponibilidad configurada." });
    }

    // Devolver la disponibilidad
    res.json(disponibilidadBase);
  } catch (error) {
    console.error("Error obteniendo disponibilidad del mentor:", error);
    // Devolver error 500 en caso de fallo
    res.status(500).json({ mensaje: "Error interno al obtener disponibilidad." });
  }
};

// Crear una indisposición
export const crearIndisposicion = async (
  req: RequestConUsuario,
  res: Response
) => {
  const { fecha, horaDesde, horaHasta, motivo } = req.body;

  // Verificar que el usuario esté autenticado
  if (!req.usuario) {
    return res.status(401).json({ mensaje: "No autenticado" });
  }

  // Crear registro de indisposición
  const indisposicion = await IndisposicionModel.create({
    mentor: req.usuario.id,
    fecha,
    horaDesde,
    horaHasta,
    motivo,
  });

  // Devolver el registro creado
  res.status(201).json(indisposicion);
};

// Listar todas las indisposiciones del mentor
export const listarIndisposiciones = async (
  req: RequestConUsuario,
  res: Response
) => {
  // Buscar indisposiciones por ID de mentor y ordenar por fecha y hora
  const indisposiciones = await IndisposicionModel.find({
    mentor: req.usuario?.id,
  }).sort({ fecha: 1, horaDesde: 1 });

  // Devolver la lista
  res.json(indisposiciones);
};

// Obtener slots disponibles en un rango de fechas
export const obtenerSlotsDisponiblesRango = async (req: Request, res: Response) => {
  const { mentorId, desde, hasta } = req.query;

  // Validar parámetros
  if (!mentorId || !desde || !hasta) {
    return res.status(400).json({ mensaje: "Faltan parámetros requeridos." });
  }

  try {
    // Llamar al service para obtener slots en rango
    const slots = await getSlotsDisponiblesRango(
      mentorId.toString(),
      new Date(desde.toString()),
      new Date(hasta.toString())
    );

    // Devolver los slots
    res.json(slots);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error obteniendo slots disponibles." });
  }
};

// Obtener cantidad de slots disponibles de un mentor
export const obtenerCantidadSlotsDisponibles = async (req: Request, res: Response) => {
  const { id } = req.params;

  // Validar que exista el ID
  if (!id) {
    return res.status(400).json({ mensaje: "Falta el ID del mentor." });
  }

  try {
    // Contar slots disponibles usando el service
    const cantidad = await contarSlotsDisponibles(id);

    // Devolver la cantidad
    res.json({ cantidad });
  } catch (error) {
    console.error("Error obteniendo cantidad de slots:", error);
    res.status(500).json({ mensaje: "Error interno al obtener slots disponibles." });
  }
};
