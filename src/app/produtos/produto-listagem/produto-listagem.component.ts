import { ProdutoService } from './../../shared/service/produto.service';
import { Component, OnInit } from '@angular/core';
import { Produto } from 'src/app/shared/model/seletor/produto';

@Component({
  selector: 'app-produto-listagem',
  templateUrl: './produto-listagem.component.html',
  styleUrls: ['./produto-listagem.component.scss']
})



export class ProdutoListagemComponent implements OnInit{

  public produtos: Array<Produto> = new Array();

  constructor(private produtoService: ProdutoService){
  }

  ngOnInit(): void {
    this.buscarProdutos();
  }

  editar(id: number){
// TODO Implementar
  }
  buscarProdutos(){
    this.produtoService.listarTodos().subscribe(
      resultado => {
        this.produtos = resultado;
      },
      erro => {
        console.log('Erro ao buscar Produtos', erro);
      }
    )

  }

}
