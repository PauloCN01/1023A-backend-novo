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

         // Verificar se o carrinho do usuário já existe
        
        // Se não existir, criar um novo carrinho

        // Se existir, deve adicionar item no carrinho

        // calcular o total do carrinho

        // Atualizar a data de atualização do carrinho
    }

    //removerItem
    removerItem(req: Request, res: Response) {

    }

    //atualizarQuantidade


    //listar


    //remover

}

export default new CarrinhoController();