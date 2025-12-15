import { Router } from "express";
import {
    obtenerPerfil,
    listarMentores,
    obtenerMentorConMentorias,
    cambiarDisponibilidad
} from "../controllers/usuarioController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

// Ruta protegida
router.get("/perfil", authMiddleware, obtenerPerfil);

router.get("/mentores", authMiddleware, listarMentores);

router.get("/mentores/:id", authMiddleware, obtenerMentorConMentorias);

router.patch("/disponibilidad", authMiddleware, cambiarDisponibilidad);


export default router;
