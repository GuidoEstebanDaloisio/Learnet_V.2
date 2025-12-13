import mongoose from "mongoose";
import { seedTemas } from "./temas.seed";
import { connectDB } from "../db";

const runSeeds = async () => {
  try {
    await connectDB();

    await seedTemas();

    console.log("🌱 Todos los seeds ejecutados");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error ejecutando seeds", error);
    process.exit(1);
  }
};

runSeeds();
