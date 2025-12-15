import { Schema, model, Types, Document } from "mongoose";

export interface ISesionAsesoria extends Document {
  alumno: Types.ObjectId;
  mentor: Types.ObjectId;
  mentoria: Types.ObjectId;
  fechaDesde: Date;
  fechaHasta: Date;
  linkMeet: string;
  estado: "no iniciada" | "en progreso" | "cancelada" | "finalizada";
}

const SesionAsesoriaSchema = new Schema<ISesionAsesoria>(
  {
    alumno: { type: Schema.Types.ObjectId, ref: "Usuario", required: true },
    mentor: { type: Schema.Types.ObjectId, ref: "Usuario", required: true },
    mentoria: { type: Schema.Types.ObjectId, ref: "Mentoria", required: true },
    fechaDesde: { type: Date, required: true },
    fechaHasta: { type: Date, required: true },
    linkMeet: {type: String, default: "",},
    estado: {
      type: String,
      enum: ["no iniciada", "en progreso", "cancelada", "finalizada"],
      default: "no iniciada",
    },
  },
  { timestamps: true }
);


export const SesionAsesoriaModel = model<ISesionAsesoria>(
  "SesionAsesoria",
  SesionAsesoriaSchema
);
