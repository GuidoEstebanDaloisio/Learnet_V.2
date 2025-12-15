import { Request, Response } from "express";
import { SolicitudModel } from "../models/Solicitud";
import { SesionAsesoriaModel } from "../models/SesionAsesoria";
import { RequestConUsuario } from "../middleware/authMiddleware";


export const crearSesionDesdeSolicitud = async (req: Request, res: Response) => {
  try {
    const { solicitudId } = req.params;

    // 1. Buscar la solicitud
    const solicitud = await SolicitudModel.findById(solicitudId);
    if (!solicitud) {
      return res.status(404).json({ message: "Solicitud no encontrada" });
    }

    // 2. Verificar que esté aceptada
    if (solicitud.estado !== "aceptada") {
      return res.status(400).json({ message: "La solicitud debe estar aceptada para crear la sesión" });
    }

    // 3. Crear la sesión copiando los campos necesarios
    const sesion = new SesionAsesoriaModel({
      alumno: solicitud.alumno,
      mentor: solicitud.mentor,
      mentoria: solicitud.mentoria,
      fechaDesde: solicitud.fechaDesde,
      fechaHasta: solicitud.fechaHasta,
      linkMeet: "", // se puede actualizar luego con un link generado
      estado: "no iniciada",
    });

    await sesion.save();

    return res.status(201).json({ message: "Sesión creada correctamente", sesion });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al crear la sesión" });
  }
};

export const listarSesionesMentor = async (req: Request, res: Response) => {
  const usuario = (req as any).usuario; // si usas RequestConUsuario, reemplazar por req.usuario
  if (!usuario) return res.status(401).json({ mensaje: "No autenticado" });

  try {
    const sesiones = await SesionAsesoriaModel.find({ mentor: usuario.id })
      .populate("alumno", "nombre apellido")
      .populate({
        path: "mentoria",
        populate: { path: "tema", select: "nombre" },
      })
      .sort({ fechaDesde: 1 });

    res.json(sesiones);
  } catch (error) {
    console.error("Error listando sesiones del mentor:", error);
    res.status(500).json({ mensaje: "Error interno al listar sesiones" });
  }
};


// Listar sesiones del alumno autenticado
export const listarSesionesAlumno = async (req: Request, res: Response) => {
  const usuario = (req as any).usuario; // si usas RequestConUsuario, reemplazar por req.usuario
  if (!usuario) return res.status(401).json({ mensaje: "No autenticado" });

  try {
    const sesiones = await SesionAsesoriaModel.find({ alumno: usuario.id })
      .populate("mentor", "nombre apellido")
      .populate({
        path: "mentoria",
        populate: { path: "tema", select: "nombre" },
      })
      .sort({ fechaDesde: 1 }); // orden ascendente por fecha

    res.json(sesiones);
  } catch (error) {
    console.error("Error listando sesiones del alumno:", error);
    res.status(500).json({ mensaje: "Error interno al listar sesiones" });
  }
};
