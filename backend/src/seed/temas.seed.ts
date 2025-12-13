import { TemaModel } from "../models/Tema";
import slugify from "slugify";

const TEMAS_BASE = [
  "Programación",
  "React",
  "Node.js",
  "Backend",
  "Frontend",
  "Bases de Datos",
  "MongoDB",
  "DevOps",
  "UX/UI",
  "Testing",
  "Carrera IT",
];

export const seedTemas = async () => {
  console.log("Seedeando temas...");

  for (const nombre of TEMAS_BASE) {
    const existe = await TemaModel.findOne({ nombre });

    if (!existe) {
      await TemaModel.create({
        nombre,
        slug: slugify(nombre, { lower: true }),
      });
      console.log(` Tema creado: ${nombre}`);
    } else {
      console.log(` Tema ya existe: ${nombre}`);
    }
  }

  console.log(" Seed de temas finalizado");
};
