import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import { roleMiddleware } from "../middleware/roleMiddleware";
import { ROLES } from "../constants/roles";
import {
  upsertDisponibilidadBase,
  obtenerDisponibilidadBase,
  crearExcepcion,
  listarExcepciones,
  obtenerSlotsDisponibles
} from "../controllers/disponibilidadController";

const router = Router();

// Base
router.get(
  "/base",
  authMiddleware,
  roleMiddleware(ROLES.MENTOR),
  obtenerDisponibilidadBase
);

router.post(
  "/base",
  authMiddleware,
  roleMiddleware(ROLES.MENTOR),
  upsertDisponibilidadBase
);

// Excepciones
router.get(
  "/excepciones",
  authMiddleware,
  roleMiddleware(ROLES.MENTOR),
  listarExcepciones
);

router.post(
  "/excepciones",
  authMiddleware,
  roleMiddleware(ROLES.MENTOR),
  crearExcepcion
);

router.get("/slots", obtenerSlotsDisponibles);

export default router;
