import { Router } from "express";
import { crearTema, listarTemas } from "../controllers/temaController";
import { authMiddleware } from "../middleware/authMiddleware";
import { roleMiddleware } from "../middleware/roleMiddleware";

const router = Router();

// Endpoint público para listar temas
router.get("/", listarTemas);

/*
router.post(
  "/",
  authMiddleware,
  roleMiddleware("admin"),
  crearTema
);
*/
export default router;
