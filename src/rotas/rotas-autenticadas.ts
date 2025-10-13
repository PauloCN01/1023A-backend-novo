import usuarioController from "../usuarios/usuario.controller.js";
import produtoController from "../produtos/produtos.controller.js";

import { NextFunction, Router, Request, Response } from "express";
import carrinhoController from "../carrinho/carrinho.controller.js";

const rotasAutenticadas = Router();


//Criando as rotasAutenticadas para usuarios
rotasAutenticadas.post('/usuarios', usuarioController.adicionar);
rotasAutenticadas.get('/usuarios', usuarioController.listar);

//Criando as rotasAutenticadas para produtos
rotasAutenticadas.post('/produtos', produtoController.adicionar);
rotasAutenticadas.get('/produtos', produtoController.listar);

//Ainda vamos ter que criar rotasAutenticadas para carrinho e produtos
rotasAutenticadas.post('/adicionarcarrinho', carrinhoController.adicionarItem); 


//Tarefa de Casa :(

export default rotasAutenticadas;