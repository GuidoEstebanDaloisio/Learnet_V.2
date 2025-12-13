import { Router } from "express";
import { registrarUsuario, login } from "../controllers/authController";

const router = Router();

router.post("/register", registrarUsuario);
router.post("/login", login);

export default router;
