import usuarioController from "./usuarios/usuario.controller.js";

import { Router } from "express";

const rotas = Router();

//Criando as rotas para usuarios
rotas.get('/usuarios', usuarioController.listar);
rotas.post('/usuarios', usuarioController.adicionar);

//Ainda vamos ter que criar rotas para carrinho e produtos
//Tarefa de Casa :(

export default rotas;