import 'dotenv/config';
import express, {Request,Response} from 'express';
import { NextFunction, Router } from "express";
import rotasAutenticadas from './rotas/rotas-autenticadas.js';
import rotasNaoAutenticadas from './rotas/rotas-naol-autenticadas.js';

const app = express();
app.use(express.json());
app.use(rotas);

//Explicando o que é um middleware

function Middleware(req:Request, res:Response, next:NextFunction) {
    return res.status(401).json({message: "Você não tem permissão para acessar esse recurso"});
}
app.use(rotasNaoAutenticadas);
app.use(Middleware);
app.use(rotasAutenticadas);


app.listen(8000, () => {
    console.log("Server is running on port 8000");
});
