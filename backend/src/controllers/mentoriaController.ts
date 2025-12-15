import { Request, Response } from "express";
import { RequestConUsuario } from "../middleware/authMiddleware";
import { MentoriaModel } from "../models/Mentoria";

export const crearMentoria = async (req: RequestConUsuario, res: Response) => {
  try {
    const { titulo, descripcion, tema } = req.body;

    // Tomar el ID del mentor autenticado
    const mentorId = req.usuario?.id;

    // Crear la mentoría en la base de datos
    const nuevaMentoria = await MentoriaModel.create({
      mentor: mentorId,
      tema,
      titulo,
      descripcion,
    });

    // Devolver la mentoría creada
    res.status(201).json(nuevaMentoria);
  } catch (error) {
    console.error(error);
    // Devolver error 500 en caso de fallo
    res.status(500).json({ mensaje: "Error creando la mentoría" });
  }
};

export const listarMentorias = async (_req: Request, res: Response) => {
  try {
    // Buscar todas las mentorías y poblar los campos de tema y mentor
    const mentorias = await MentoriaModel.find()
      .populate("tema", "nombre slug")
      .populate("mentor", "nombre apellido email");

    // Devolver la lista de mentorías
    res.json(mentorias);
  } catch (error) {
    console.error(error);
    // Devolver error 500 en caso de fallo
    res.status(500).json({ mensaje: "Error listando mentorías" });
  }
};

export const listarMisMentorias = async (
  req: RequestConUsuario,
  res: Response
) => {
  try {
    // Verificar que el usuario esté autenticado
    if (!req.usuario) {
      return res.status(401).json({ mensaje: "No autenticado" });
    }

    // Buscar mentorías donde el mentor sea el usuario autenticado
    const mentorias = await MentoriaModel.find({
      mentor: req.usuario.id,
    })
      .populate("tema", "nombre slug")
      .sort({ createdAt: -1 }); // Ordenar de más recientes a más antiguas

    // Devolver la lista de mentorías
    res.json(mentorias);
  } catch (error) {
    console.error(error);
    // Devolver error 500 en caso de fallo
    res.status(500).json({ mensaje: "Error listando mentorías del mentor" });
  }
};

export const listarMentoriaPorId = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Buscar la mentoría por ID y poblar campos de tema y mentor
    const mentoria = await MentoriaModel.findById(id)
      .populate("tema", "nombre slug")
      .populate("mentor", "nombre apellido email");

    // Devolver 404 si no se encuentra
    if (!mentoria) {
      return res.status(404).json({ mensaje: "Mentoría no encontrada" });
    }

    // Devolver la mentoría encontrada
    res.json(mentoria);
  } catch (error) {
    console.error(error);
    // Devolver error 500 en caso de fallo
    res.status(500).json({ mensaje: "Error obteniendo la mentoría" });
  }
};

export const editarMentoria = async (
  req: RequestConUsuario,
  res: Response
) => {
  try {
    const { id } = req.params;
    const { titulo, descripcion, tema } = req.body;

    // Verificar que el usuario esté autenticado
    if (!req.usuario) {
      return res.status(401).json({ mensaje: "No autenticado" });
    }

    // Buscar la mentoría por ID
    const mentoria = await MentoriaModel.findById(id);

    // Devolver 404 si no existe
    if (!mentoria) {
      return res.status(404).json({ mensaje: "Mentoría no encontrada" });
    }

    // Validar que el usuario autenticado sea el dueño de la mentoría
    if (mentoria.mentor.toString() !== req.usuario.id) {
      return res.status(403).json({ mensaje: "No autorizado" });
    }

    // Actualizar los campos proporcionados
    mentoria.titulo = titulo ?? mentoria.titulo;
    mentoria.descripcion = descripcion ?? mentoria.descripcion;
    mentoria.tema = tema ?? mentoria.tema;

    // Guardar los cambios en la base de datos
    await mentoria.save();

    // Devolver la mentoría actualizada
    res.json(mentoria);
  } catch (error) {
    console.error(error);
    // Devolver error 500 en caso de fallo
    res.status(500).json({ mensaje: "Error editando la mentoría" });
  }
};
