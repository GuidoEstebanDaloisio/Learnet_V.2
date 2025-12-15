import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import { aceptarSolicitud, crearSolicitud, listarSolicitudesAlumno, listarSolicitudesMentor, rechazarSolicitud } from "../controllers/solicitudController";

const router = Router();

// Crear solicitud de mentoría (solo alumno)
router.post("/", authMiddleware, crearSolicitud);

router.patch("/:id/rechazar", authMiddleware, rechazarSolicitud);

router.patch("/:id/aceptar", authMiddleware, aceptarSolicitud);

// Listar solicitudes del alumno autenticado
router.get("/", authMiddleware, listarSolicitudesAlumno);

router.get("/mentor", authMiddleware, listarSolicitudesMentor);


export default router;
