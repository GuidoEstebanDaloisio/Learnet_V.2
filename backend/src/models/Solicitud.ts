import { Schema, model, Types, Document } from "mongoose";

export interface ISolicitud extends Document {
  alumno: Types.ObjectId;
  mentor: Types.ObjectId;
  mentoria: Types.ObjectId;
  fechaSolicitada: Date;
  mensajeOpcional?: string;
  estado: "pendiente" | "aceptada" | "rechazada";
}

const SolicitudSchema = new Schema<ISolicitud>(
  {
    alumno: { type: Schema.Types.ObjectId, ref: "Usuario", required: true },
    mentor: { type: Schema.Types.ObjectId, ref: "Usuario", required: true },
    mentoria: { type: Schema.Types.ObjectId, ref: "Mentoria", required: true },
    fechaSolicitada: { type: Date, required: true },
    mensajeOpcional: { type: String },
    estado: { type: String, enum: ["pendiente", "aceptada", "rechazada"], default: "pendiente" },
  },
  { timestamps: true }
);

export const SolicitudModel = model<ISolicitud>(
  "Solicitud",
  SolicitudSchema
);
