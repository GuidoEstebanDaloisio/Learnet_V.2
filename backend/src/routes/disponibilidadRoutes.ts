import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import { roleMiddleware } from "../middleware/roleMiddleware";
import { ROLES } from "../constants/roles";
import {
  upsertDisponibilidadBase,
  obtenerDisponibilidadBase,
  crearIndisposicion,
  listarIndisposiciones,
  obtenerSlotsDisponibles,
  obtenerDisponibilidadMentorPorId,
  obtenerSlotsDisponiblesRango,
  obtenerCantidadSlotsDisponibles
} from "../controllers/disponibilidadController";

const router = Router();

router.get("/mentor/:id/cantidad-slots", obtenerCantidadSlotsDisponibles);

// Obtener slots en un rango de fechas (ej: hoy hasta un mes)
router.get("/slots/rango", obtenerSlotsDisponiblesRango);


// Obtener disponibilidad base de un mentor por ID (para que lo vea un alumno)
router.get("/:id/base", obtenerDisponibilidadMentorPorId);

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

router.get(
  "/indisposiciones",
  authMiddleware,
  roleMiddleware(ROLES.MENTOR),
  listarIndisposiciones
);

router.post(
  "/indisposiciones",
  authMiddleware,
  roleMiddleware(ROLES.MENTOR),
  crearIndisposicion
);

router.get("/slots", obtenerSlotsDisponibles);

export default router;
