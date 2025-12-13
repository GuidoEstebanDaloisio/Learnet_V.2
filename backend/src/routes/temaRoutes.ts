import { Router } from "express";
import { crearTema } from "../controllers/temaController";
import { authMiddleware } from "../middleware/authMiddleware";
import { roleMiddleware } from "../middleware/roleMiddleware";

const router = Router();

router.post(
  "/",
  authMiddleware,
  roleMiddleware("admin"),
  crearTema
);

export default router;
