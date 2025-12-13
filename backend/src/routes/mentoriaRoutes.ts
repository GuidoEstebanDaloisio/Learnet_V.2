import { Router } from "express";
import { crearMentoria, listarMentorias } from "../controllers/mentoriaController";
import { authMiddleware } from "../middleware/authMiddleware";
import { roleMiddleware } from "../middleware/roleMiddleware";
import { ROLES } from "../constants/roles";

const router = Router();

// Solo los mentores pueden crear mentorías
router.post("/", authMiddleware, roleMiddleware(ROLES.MENTOR), crearMentoria);

// Listar todas las mentorías (con populate de tema y mentor)
router.get("/", authMiddleware, listarMentorias);

export default router;
