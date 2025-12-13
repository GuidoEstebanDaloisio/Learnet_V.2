import express from "express";
import cors from "cors";
import "express-async-errors";
import authRoutes from "./routes/authRoutes";
import usuarioRoutes from "./routes/usuarioRoutes";
import mentoriaRoutes from "./routes/mentoriaRoutes";
import temaRoutes from "./routes/temaRoutes";


const app = express();

app.use(cors());
app.use(express.json());


app.use("/api/auth", authRoutes);
app.use("/api/usuario", usuarioRoutes);
app.use("/api/mentorias", mentoriaRoutes);
app.use("/api/temas", temaRoutes);


export default app;
