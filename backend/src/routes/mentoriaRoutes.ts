import { Router } from "express";
import { crearMentoria, listarMentorias, listarMisMentorias , listarMentoriaPorId, editarMentoria} from "../controllers/mentoriaController";
import { authMiddleware } from "../middleware/authMiddleware";
import { roleMiddleware } from "../middleware/roleMiddleware";
import { ROLES } from "../constants/roles";

const router = Router();

// Solo los mentores pueden crear mentorías
router.post("/", authMiddleware, roleMiddleware(ROLES.MENTOR), crearMentoria);

// mentorías del mentor logueado
router.get(
  "/mias",
  authMiddleware,
  roleMiddleware(ROLES.MENTOR),
  listarMisMentorias
);

router.get("/:id", authMiddleware, listarMentoriaPorId);

// Editar mentoría (solo mentor dueño)
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware(ROLES.MENTOR),
  editarMentoria
);

// Listar todas las mentorías (con populate de tema y mentor)
router.get("/", authMiddleware, listarMentorias);

export default router;
