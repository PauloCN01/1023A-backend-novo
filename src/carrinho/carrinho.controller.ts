import { Request, Response } from 'express';
import { db } from '../database/banco.mongo.js';
import { ObjectId } from 'mongodb';

interface ItemCarrinho {
  produtoId: ObjectId;
  quantidade: number;
 precoUnitario: number;
  nome: string;
}

interface Carrinho {
  usuarioId: ObjectId;
  itens: ItemCarrinho[];
  datatualizacao: Date;
  total: number;
}

class CarrinhoController {
    //adicionarItem
    async adicionarItem(req: Request, res: Response) {
        const { usuarioId, produtoId, quantidade, precoUnitario, nome } = req.body;
        console.log(usuarioId, produtoId, quantidade, precoUnitario, nome);
        
        // Verificar se o carrinho do usuário já existe
        const carrinho = await db.collection<Carrinho>('carrinhos').findOne({ usuarioID: ObjectId.createFromHexString(usuarioId) });
        // Se não existir, criar um novo carrinho
        if (!carrinho) {
          const novoCarrinho: Carrinho = {
            usuarioId: ObjectId.createFromHexString(usuarioId),
            itens: [{ produtoId, quantidade, precoUnitario, nome }],
            datatualizacao: new Date(),
            total: quantidade * precoUnitario
          } 
          await db.collection<Carrinho>('carrinhos').insertOne(novoCarrinho);
          res.status(201).json(novoCarrinho);
        }
        else {
          //verificar se o item já existe no carrinho
          const itemExiste = carrinho.itens.find((item) => item.produtoId = ObjectId.createFromHexString(produtoId));
          if (!itemExiste) {
            carrinho.itens.push({ produtoId: ObjectId.createFromHexString(produtoId), quantidade, precoUnitario, nome });
            // calcular o total do carrinho
            carrinho.total += quantidade * precoUnitario;
            // Atualizar a data de atualização do carrinho
            carrinho.datatualizacao = new Date();
            await db.collection<Carrinho>('carrinhos').updateOne({ usuarioId: ObjectId.createFromHexString(usuarioId) }, { $set:{itens: carrinho.itens, total: carrinho.total, datatualizacao: carrinho.datatualizacao, } });
            res.status(200).json(carrinho);
          }
        }

    }

    //removerItem


    //atualizarQuantidade


    //listar


    //remover

}

export default new CarrinhoController();