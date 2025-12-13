import { Schema, model, Types } from "mongoose";
import { ITema } from "./Tema";
import { IUsuario } from "./Usuario";

export interface IMentoria {
  mentor: Types.ObjectId; // referencia al usuario que es mentor
  tema: Types.ObjectId;   // referencia a Tema
  titulo: string;
  descripcion: string;
  creadoEn?: Date;
}

const MentoriaSchema = new Schema<IMentoria>(
  {
    mentor: { type: Schema.Types.ObjectId, ref: "Usuario", required: true },
    tema: { type: Schema.Types.ObjectId, ref: "Tema", required: true },
    titulo: { type: String, required: true, trim: true },
    descripcion: { type: String, required: true, trim: true },
  },
  {
    timestamps: true,
  }
);

export const MentoriaModel = model<IMentoria>("Mentoria", MentoriaSchema);
