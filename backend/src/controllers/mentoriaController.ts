import { Request, Response } from "express";
import { RequestConUsuario } from "../middleware/authMiddleware";
import { MentoriaModel } from "../models/Mentoria";

export const crearMentoria = async (req: RequestConUsuario, res: Response) => {
  try {
    const { titulo, descripcion, tema } = req.body;

    const mentorId = req.usuario?.id; // 🔹 ya existe en RequestConUsuario

    const nuevaMentoria = await MentoriaModel.create({
      mentor: mentorId,
      tema,
      titulo,
      descripcion,
    });

    res.status(201).json(nuevaMentoria);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error creando la mentoría" });
  }
};

export const listarMentorias = async (_req: Request, res: Response) => {
  try {
    const mentorias = await MentoriaModel.find()
      .populate("tema", "nombre slug")
      .populate("mentor", "nombre apellido email");
    res.json(mentorias);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error listando mentorías" });
  }
};
