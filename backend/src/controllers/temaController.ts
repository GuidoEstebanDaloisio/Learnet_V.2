import { Request, Response } from "express";
import { TemaModel } from "../models/Tema";
import slugify from "slugify";
// Crear un nuevo tema
export const crearTema = async (req: Request, res: Response) => {
  try {
    const { nombre } = req.body;

    // Verificar si el tema ya existe
    const existe = await TemaModel.findOne({ nombre });
    if (existe) {
      return res.status(400).json({ mensaje: "El tema ya existe" });
    }

    // Crear el tema y generar slug
    const tema = await TemaModel.create({
      nombre,
      slug: slugify(nombre, { lower: true }),
    });

    // Devolver el tema creado
    return res.status(201).json(tema);
  } catch (error) {
    console.error(error);
    // Devolver error 500 en caso de fallo
    return res.status(500).json({ mensaje: "Error al crear tema" });
  }
};

// Listar todos los temas activos
export const listarTemas = async (req: Request, res: Response) => {
  try {
    // Buscar temas activos y ordenar por nombre
    const temas = await TemaModel.find({ activo: true }).sort({ nombre: 1 });

    // Devolver la lista de temas
    res.json(temas);
  } catch (error) {
    console.error(error);
    // Devolver error 500 en caso de fallo
    res.status(500).json({ mensaje: "Error listando temas" });
  }
};
