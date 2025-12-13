import mongoose, { Schema, Document } from "mongoose";
import { ROLES } from "../constants/roles";

export interface IUsuario extends Document {
  nombre: string;
  apellido: string;
  email: string;
  password: string;
  tipo: typeof ROLES[keyof typeof ROLES];

  // Alumno
  fechaNacimiento?: Date;

  // Mentor
  tituloProfesional?: string;
  experiencia?: string;
  fechaDeIngreso?: Date;
  estaDisponible?: boolean;

  // Relaciones futuras
  mentorias?: mongoose.Types.ObjectId[];
}

const UsuarioSchema = new Schema<IUsuario>(
  {
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    tipo: {
      type: String,
      enum: Object.values(ROLES),
      required: true,
    },

    // Alumno
    fechaNacimiento: { type: Date },

    // Mentor
    tituloProfesional: { type: String },
    experiencia: { type: String },
    fechaDeIngreso: { type: Date },
    estaDisponible: { type: Boolean },

    mentorias: [{ type: mongoose.Schema.Types.ObjectId, ref: "Mentoria" }],
  },
  { timestamps: true }
);

export const UsuarioModel = mongoose.model<IUsuario>(
  "Usuario",
  UsuarioSchema
);
