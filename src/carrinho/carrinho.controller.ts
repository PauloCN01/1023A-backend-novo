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
        const carrinho = await db.collection<Carrinho>('carrinhos').findOne({ usuarioId: ObjectId.createFromHexString(usuarioId) });
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
     async removerItem(req: Request, res: Response) {
        const { usuarioId, produtoId } = req.body;
        // Verificar se o carrinho do usuário existe
        const carrinho = await db.collection<Carrinho>('carrinhos').findOne({ usuarioId: ObjectId.createFromHexString(usuarioId) });
        if (!carrinho) {
          res.status(404).json({ message: 'Carrinho não encontrado' });
          return;
        }
        // Verificar se o item existe no carrinho
        const itemExiste = carrinho.itens.find((item) => item.produtoId = ObjectId.createFromHexString(produtoId));
        if (!itemExiste) {
          res.status(404).json({ message: 'Item não encontrado no carrinho' });
          return;
        }
        else{
          // Remover o item do carrinho
          carrinho.itens = carrinho.itens.filter((item) => item.produtoId !== ObjectId.createFromHexString(produtoId));
          // Atualizar o total do carrinho
          carrinho.total -= itemExiste.quantidade * itemExiste.precoUnitario;
          // Atualizar a data de atualização do carrinho
          carrinho.datatualizacao = new Date();
          db.collection<Carrinho>('carrinhos').updateOne({ usuarioId: ObjectId.createFromHexString(usuarioId) }, { $set:{itens: carrinho.itens, total: carrinho.total, datatualizacao: carrinho.datatualizacao, } });
          res.status(200).json(carrinho);
        }
    }

    //atualizarQuantidade
    async atualizarQuantidade(req: Request, res: Response) {
        const { usuarioId, produtoId, quantidade } = req.body;
        // Verificar se o carrinho do usuário existe
        const carrinho = await db.collection<Carrinho>('carrinhos').findOne({ usuarioId: ObjectId.createFromHexString(usuarioId) });
        if (!carrinho) {
          res.status(404).json({ message: 'Carrinho não encontrado' });
          return;
        }
        // Verificar se o item existe no carrinho
        const itemExiste = carrinho.itens.find((item) => item.produtoId = ObjectId.createFromHexString(produtoId));
        if (!itemExiste) {
          res.status(404).json({ message: 'Item não encontrado no carrinho' });
          return;
        }
        else{
          // Atualizar a quantidade do item no carrinho
          const diferencaQuantidade = quantidade - itemExiste.quantidade;
          itemExiste.quantidade = quantidade;
        }
    }

    //listar
    async listar(req: Request, res: Response) {
        const { usuarioId } = req.params;
        const carrinho = await db.collection<Carrinho>('carrinhos').findOne({ usuarioId: ObjectId.createFromHexString(usuarioId) });
        if (!carrinho) {
          res.status(404).json({ message: 'Carrinho não encontrado' });
          return;
        }
        res.status(200).json(carrinho);
    }

    //remover
    async remover(req: Request, res: Response) {
        const { usuarioId } = req.params;
        const carrinho = await db.collection<Carrinho>('carrinhos').findOne({ usuarioId: ObjectId.createFromHexString(usuarioId) });
        if (!carrinho) {
          res.status(404).json({ message: 'Carrinho não encontrado' });
          return;
        }
        db.collection<Carrinho>('carrinhos').deleteOne({ usuarioId: ObjectId.createFromHexString(usuarioId) });
        res.status(200).json({ message: 'Carrinho removido com sucesso' });
    }

}

export default new CarrinhoController();
