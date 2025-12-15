import { Request, Response } from "express";
import { SolicitudModel } from "../models/Solicitud";
import { SesionAsesoriaModel } from "../models/SesionAsesoria";
import { RequestConUsuario } from "../middleware/authMiddleware";


// Crear una sesión de asesoría a partir de una solicitud aceptada
export const crearSesionDesdeSolicitud = async (req: Request, res: Response) => {
  try {
    const { solicitudId } = req.params;

    // Buscar la solicitud por ID
    const solicitud = await SolicitudModel.findById(solicitudId);
    if (!solicitud) {
      return res.status(404).json({ message: "Solicitud no encontrada" });
    }

    // Verificar que la solicitud esté aceptada
    if (solicitud.estado !== "aceptada") {
      return res.status(400).json({ message: "La solicitud debe estar aceptada para crear la sesión" });
    }

    // Crear la sesión copiando los campos necesarios de la solicitud
    const sesion = new SesionAsesoriaModel({
      alumno: solicitud.alumno,
      mentor: solicitud.mentor,
      mentoria: solicitud.mentoria,
      fechaDesde: solicitud.fechaDesde,
      fechaHasta: solicitud.fechaHasta,
      linkMeet: "", // Inicializar sin link, se puede actualizar luego
      estado: "no iniciada",
    });

    // Guardar la sesión en la base de datos
    await sesion.save();

    // Devolver la sesión creada
    return res.status(201).json({ message: "Sesión creada correctamente", sesion });
  } catch (error) {
    console.error(error);
    // Devolver error 500 en caso de fallo
    return res.status(500).json({ message: "Error al crear la sesión" });
  }
};

export const listarSesionesMentor = async (req: Request, res: Response) => {
  const usuario = (req as any).usuario; // Reemplazar por RequestConUsuario si aplica
  if (!usuario) return res.status(401).json({ mensaje: "No autenticado" });

  try {
    // Buscar sesiones donde el mentor sea el usuario autenticado
    const sesiones = await SesionAsesoriaModel.find({ mentor: usuario.id })
      .populate("alumno", "nombre apellido") // Poblar datos del alumno
      .populate({
        path: "mentoria",
        populate: { path: "tema", select: "nombre" }, // Poblar tema de la mentoría
      })
      .sort({ fechaDesde: 1 }); // Ordenar ascendente por fecha

    // Devolver la lista de sesiones
    res.json(sesiones);
  } catch (error) {
    console.error("Error listando sesiones del mentor:", error);
    // Devolver error 500 en caso de fallo
    res.status(500).json({ mensaje: "Error interno al listar sesiones" });
  }
};

export const listarSesionesAlumno = async (req: Request, res: Response) => {
  const usuario = (req as any).usuario; // Reemplazar por RequestConUsuario si aplica
  if (!usuario) return res.status(401).json({ mensaje: "No autenticado" });

  try {
    // Buscar sesiones donde el alumno sea el usuario autenticado
    const sesiones = await SesionAsesoriaModel.find({ alumno: usuario.id })
      .populate("mentor", "nombre apellido") // Poblar datos del mentor
      .populate({
        path: "mentoria",
        populate: { path: "tema", select: "nombre" }, // Poblar tema de la mentoría
      })
      .sort({ fechaDesde: 1 }); // Ordenar ascendente por fecha

    // Devolver la lista de sesiones
    res.json(sesiones);
  } catch (error) {
    console.error("Error listando sesiones del alumno:", error);
    // Devolver error 500 en caso de fallo
    res.status(500).json({ mensaje: "Error interno al listar sesiones" });
  }
};

export const actualizarLinkMeet = async (req: RequestConUsuario, res: Response) => {
  try {
    const { id } = req.params;
    const { linkMeet } = req.body;

    // Validar que el link exista
    if (!linkMeet || linkMeet.trim() === "") {
      return res.status(400).json({ mensaje: "El link es obligatorio" });
    }

    // Verificar que el usuario esté autenticado
    if (!req.usuario || !req.usuario.id) {
      return res.status(401).json({ mensaje: "No autenticado" });
    }

    // Buscar la sesión por ID
    const sesion = await SesionAsesoriaModel.findById(id);
    if (!sesion) {
      return res.status(404).json({ mensaje: "Sesión no encontrada" });
    }

    // Verificar que el usuario sea el mentor dueño de la sesión
    if (sesion.mentor.toString() !== req.usuario.id) {
      return res.status(403).json({ mensaje: "No autorizado" });
    }

    // Actualizar el link de Meet
    sesion.linkMeet = linkMeet;
    await sesion.save();

    // Devolver la sesión actualizada
    res.json({ mensaje: "Link actualizado correctamente", sesion });
  } catch (error) {
    console.error(error);
    // Devolver error 500 en caso de fallo
    res.status(500).json({ mensaje: "Error al actualizar el link" });
  }
};
