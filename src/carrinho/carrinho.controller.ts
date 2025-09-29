import { Request, Response } from 'express';
import { db } from '../database/banco.mongo.js';

interface ItemCarrinho {
  produtoId: number;
  quantidade: number;
  precosolitario: number;
  nome: string;
}

interface Carrinho {
  usuarioId: number;
  itens: ItemCarrinho[];
  datatualizacao: Date;
  total: number;
}

class CarrinhoController {
    //adicionarItem
    async adicionarItem(req: Request, res: Response) {
        const { usuarioId, produtoId, quantidade, precosolitario, nome } = req.body;
        console.log(usuarioId, produtoId, quantidade, precosolitario, nome);
        
        // Verificar se o carrinho do usuário já existe
        const carrinho = await db.collection<Carrinho>('carrinhos').find({ usuarioID: usuarioId }).toArray();
        if (carrinho.length === 0) {
          const novoCarrinho: Carrinho = {
            usuarioId,
            itens: [{ produtoId, quantidade, precosolitario, nome }],
            datatualizacao: new Date(),
            total: quantidade * precosolitario
          } 
          await db.collection<Carrinho>('carrinhos').insertOne(novoCarrinho);
          res.status(201).json(novoCarrinho);
        }
        else {
          
        }      
        // Se não existir, criar um novo carrinho
        // Se não existir, criar um novo carrinho

        // Se existir, deve adicionar item no carrinho

        // calcular o total do carrinho

        // Atualizar a data de atualização do carrinho
    }

    //removerItem


    //atualizarQuantidade


    //listar


    //remover

}

export default new CarrinhoController();