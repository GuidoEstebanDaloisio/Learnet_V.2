import { Router } from "express";
import { crearSesionDesdeSolicitud, listarSesionesMentor, listarSesionesAlumno } from "../controllers/sesionAsesoriaController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

// POST /sesiones/crear/:solicitudId
router.post("/crear/:solicitudId", crearSesionDesdeSolicitud);

router.get("/mentor", authMiddleware, listarSesionesMentor);

router.get("/alumno", authMiddleware, listarSesionesAlumno);


export default router;
