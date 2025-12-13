import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UsuarioModel } from "../models/Usuario";

export const registrarUsuario = async (req: Request, res: Response) => {
  try {
    const {
      nombre,
      apellido,
      email,
      password,
      tipo,
      fechaNacimiento,
      tituloProfesional,
      experiencia,
      fechaDeIngreso
    } = req.body;

    const existe = await UsuarioModel.findOne({ email });
    if (existe) {
      return res.status(400).json({ mensaje: "El email ya está registrado." });
    }

    const hash = await bcrypt.hash(password, 10);

    const usuario = await UsuarioModel.create({
      nombre,
      apellido,
      email,
      password: hash,
      tipo,
      fechaNacimiento,
      tituloProfesional,
      experiencia,
      fechaDeIngreso,
      estaDisponible: tipo === "mentor" ? true : undefined,
    });

    return res.status(201).json({ mensaje: "Usuario registrado con éxito" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensaje: "Error en el servidor" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const usuario = await UsuarioModel.findOne({ email });
    if (!usuario) {
      return res.status(404).json({ mensaje: "Credenciales inválidas" });
    }

    const coincide = await bcrypt.compare(password, usuario.password);
    if (!coincide) {
      return res.status(400).json({ mensaje: "Credenciales inválidas" });
    }

    const token = jwt.sign(
      {
        id: usuario._id,
        tipo: usuario.tipo,
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "1d",
      }
    );

    return res.json({
      mensaje: "Login exitoso",
      token,
      usuario: {
        id: usuario._id,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        email: usuario.email,
        fechaNacimiento: usuario.fechaNacimiento,
        tipo: usuario.tipo,
        tituloProfesional: usuario.tituloProfesional,
        experiencia: usuario.experiencia,
        fechaDeIngreso: usuario.fechaDeIngreso,
        estaDisponible: usuario.estaDisponible,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensaje: "Error en el servidor" });
  }
};
