import { Request, Response } from "express";
import { TemaModel } from "../models/Tema";
import slugify from "slugify";

export const crearTema = async (req: Request, res: Response) => {
  try {
    const { nombre } = req.body;

    const existe = await TemaModel.findOne({ nombre });
    if (existe) {
      return res.status(400).json({ mensaje: "El tema ya existe" });
    }

    const tema = await TemaModel.create({
      nombre,
      slug: slugify(nombre, { lower: true }),
    });

    return res.status(201).json(tema);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensaje: "Error al crear tema" });
  }
};
