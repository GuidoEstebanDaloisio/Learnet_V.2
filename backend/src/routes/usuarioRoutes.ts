import { Router } from "express";
import { obtenerPerfil } from "../controllers/usuarioController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

// Ruta protegida
router.get("/perfil", authMiddleware, obtenerPerfil);

export default router;
