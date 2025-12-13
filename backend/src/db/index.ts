import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // carga las variables de .env

export const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI; // obtener URI desde .env
    if (!uri) throw new Error("❌ MONGO_URI no definido en .env");

    await mongoose.connect(uri);
    console.log("✅ Conectado a MongoDB");
  } catch (error) {
    console.error("❌ Error conectando a MongoDB:", error);
    process.exit(1);
  }
};
