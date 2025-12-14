import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import { crearSolicitud, listarSolicitudesAlumno, listarSolicitudesMentor } from "../controllers/solicitudController";

const router = Router();

// Crear solicitud de mentoría (solo alumno)
router.post("/", authMiddleware, crearSolicitud);

// Listar solicitudes del alumno autenticado
router.get("/", authMiddleware, listarSolicitudesAlumno);

router.get("/mentor", authMiddleware, listarSolicitudesMentor);


export default router;
