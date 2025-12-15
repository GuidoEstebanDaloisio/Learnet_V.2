import { Request, Response } from "express";
import { RequestConUsuario } from "../middleware/authMiddleware";
import { UsuarioModel } from "../models/Usuario";
import { MentoriaModel } from "../models/Mentoria"
;
export const obtenerPerfil = async (req: RequestConUsuario, res: Response) => {
  try {
    // Verificar autenticación
    if (!req.usuario) {
      return res.status(401).json({ mensaje: "No autorizado" });
    }

    // Buscar usuario por ID y excluir contraseña
    const usuario = await UsuarioModel.findById(req.usuario.id).select(
      "-password"
    );

    if (!usuario) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    // Devolver datos del usuario
    return res.json(usuario);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensaje: "Error en el servidor" });
  }
};

export const listarMentores = async (_req: RequestConUsuario, res: Response) => {
  try {
    // Buscar usuarios tipo mentor y seleccionar campos relevantes
    const mentores = await UsuarioModel.find({
      tipo: "mentor",
    }).select(
      "nombre apellido tituloProfesional estaDisponible"
    );

    // Devolver lista de mentores
    res.json(mentores);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error listando mentores" });
  }
};

export const obtenerMentorConMentorias = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;

    // Buscar mentor por ID y excluir contraseña
    const mentor = await UsuarioModel.findById(id).select("-password");

    if (!mentor || mentor.tipo !== "mentor") {
      return res.status(404).json({ mensaje: "Mentor no encontrado" });
    }

    // Buscar mentorías del mentor y poblar tema
    const mentorias = await MentoriaModel.find({ mentor: id })
      .populate("tema", "nombre slug")
      .sort({ createdAt: -1 });

    // Devolver datos del mentor junto con sus mentorías
    res.json({
      ...mentor.toObject(),
      mentorias,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error obteniendo mentor" });
  }
};

export const cambiarDisponibilidad = async (req: RequestConUsuario, res: Response) => {
  try {
    const { estaDisponible } = req.body;

    // Verificar autenticación
    if (!req.usuario) {
      return res.status(401).json({ mensaje: "No autorizado" });
    }

    // Buscar usuario y verificar que sea mentor
    const usuario = await UsuarioModel.findById(req.usuario.id);
    if (!usuario || usuario.tipo !== "mentor") {
      return res.status(403).json({ mensaje: "Solo los mentores pueden cambiar su disponibilidad" });
    }

    // Actualizar disponibilidad y guardar
    usuario.estaDisponible = estaDisponible;
    await usuario.save();

    // Devolver estado actualizado
    res.json({ mensaje: "Disponibilidad actualizada", estaDisponible: usuario.estaDisponible });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error actualizando disponibilidad" });
  }
};
