import usuarioController from "./usuarios/usuario.controller.js";
import produtoController from "./produtos/produtos.controller.js";

import { Router } from "express";
import carrinhoController from "./carrinho/carrinho.controller.js";

const rotas = Router();

//Criando as rotas para usuarios
rotas.post('/usuarios', usuarioController.adicionar);
rotas.get('/usuarios', usuarioController.listar);

//Criando as rotas para produtos
rotas.post('/produtos', produtoController.adicionar);
rotas.get('/produtos', produtoController.listar);

//Ainda vamos ter que criar rotas para carrinho e produtos
rotas.post('/adicionarcarrinho', carrinhoController.adicionarItem); 
// rotas.get('/adicionarcarrinho', carrinhoController.listar);

//Tarefa de Casa :(

export default rotas;