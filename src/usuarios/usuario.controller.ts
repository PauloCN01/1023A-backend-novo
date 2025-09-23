import { Request, Response } from "express";

import { db } from "../database/banco.mongo.js";

class UsuarioController {
  async adicionar(req:Request, res:Response) {
    const usuario = req.body;
    const resultado = await db.collection('usuarios')
    .insertOne(usuario);
    res.status(201).json({...usuario, _id: resultado.insertedId });
  }
  async listar(req:Request, res:Response) {
    const usuarios = await db.collection('usuarios').find().toArray();
    res.status(200).json(usuarios);
  }
}
export default new UsuarioController();