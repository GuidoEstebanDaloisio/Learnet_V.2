import { Schema, model, Types } from "mongoose";

export interface ITema {
  nombre: string; 
  slug: string;     //para evitar errores con el nombre como espacios, mayusculas o tildes a nivel codigo y filtros
  activo: boolean;  //para ocultar temas sin borrarlos, por ejemplo si un tema queda en desuso pero luego se requiere recuperar (util antes de borrarlo)
  createdAt?: Date;
}

const TemaSchema = new Schema<ITema>(
  {
    nombre: {
      type: String,
      required: true,
      unique: true, //evita duplicados
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    activo: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export const TemaModel = model<ITema>("Tema", TemaSchema);
