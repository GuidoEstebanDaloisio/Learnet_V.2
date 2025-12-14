import { Schema, model, Types } from "mongoose";

// Este seria el margen horario en el que trabaja en mentor
const DisponibilidadBaseSchema = new Schema(
  {
    mentor: {
      type: Types.ObjectId,
      ref: "Usuario",
      required: true,
      unique: true, // Una sola regla base
    },

    diasSemana: {
      type: [Number], // 0 = domingo
      required: true,
    },

    horaDesde: {
      type: String, // "08:00"
      required: true,
    },

    horaHasta: {
      type: String, // "16:00"
      required: true,
    },

    duracionSesion: {
      type: Number, // minutos
      default: 60,
    },
  },
  { timestamps: true }
);

export const DisponibilidadBaseModel = model(
  "DisponibilidadBase",
  DisponibilidadBaseSchema
);
