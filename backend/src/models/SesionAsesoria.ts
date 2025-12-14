import { Schema, model, Types } from "mongoose";

export const ESTADOS_SESION = {
  NO_INICIADA: "no iniciada",
  EN_PROGRESO: "en progreso",
  CANCELADA: "cancelada",
  FINALIZADA: "finalizada",
} as const;

const SesionAsesoriaSchema = new Schema(
  {
    mentoria: {
      type: Types.ObjectId,
      ref: "Mentoria",
      required: true,
    },

    mentor: {
      type: Types.ObjectId,
      ref: "Usuario",
      required: true,
    },

    alumno: {
      type: Types.ObjectId,
      ref: "Usuario",
      required: true,
    },

    inicio: {
      type: Date,
      required: true,
    },

    fin: {
      type: Date,
      required: true,
    },

    estado: {
      type: String,
      enum: Object.values(ESTADOS_SESION),
      default: ESTADOS_SESION.NO_INICIADA,
    },

    linkMeet: {
      type: String,
    },
  },
  { timestamps: true }
);

export const SesionAsesoriaModel = model(
  "SesionAsesoria",
  SesionAsesoriaSchema
);
