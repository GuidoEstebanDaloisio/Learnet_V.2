import { Schema, model, Types } from "mongoose";

//Este modelo se contrasta con el DisponibilidadBase ya que este incluye los dias y horas en el que el mentor no estara disponible.
const IndisposicionSchema = new Schema(
  {
    mentor: {
      type: Types.ObjectId,
      ref: "Usuario",
      required: true,
    },

    // Puede ser por fecha puntual
    fecha: {
      type: Date,
    },

    // O por día de semana recurrente
    diaSemana: {
      type: Number,
      min: 0,
      max: 6,
    },

    horaDesde: {
      type: String,
      required: true,
    },

    horaHasta: {
      type: String,
      required: true,
    },

    motivo: {
      type: String,
    },
  },
  { timestamps: true }
);

export const IndisposicionModel = model(
  "Indisponibilidad",
  IndisposicionSchema
);
