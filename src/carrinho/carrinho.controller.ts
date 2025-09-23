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
    adicionarItem(req: Request, res: Response) {
        const { usuarioId, produtoId, quantidade, precosolitario, nome } = req.body;

        
    }

    //removerItem
    removerItem(req: Request, res: Response) {

    }

    //atualizarQuantidade


    //listar


    //remover

}

export default new CarrinhoController();