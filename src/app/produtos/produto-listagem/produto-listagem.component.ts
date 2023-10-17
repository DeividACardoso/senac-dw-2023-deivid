import { Router } from '@angular/router';
import { ProdutoSeletor } from './../../shared/model/seletor/produto.seletor';
import { ProdutoService } from './../../shared/service/produto.service';
import { Component, OnInit } from '@angular/core';
import { Produto } from 'src/app/shared/model/produto';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-produto-listagem',
  templateUrl: './produto-listagem.component.html',
  styleUrls: ['./produto-listagem.component.scss']
})



export class ProdutoListagemComponent implements OnInit{

  public seletor: ProdutoSeletor = new ProdutoSeletor();
  public produtos: Array<Produto> = new Array();

  constructor(private produtoService: ProdutoService,
              private router: Router){
  }

  ngOnInit(): void {
    this.buscarProdutos();
  }

  editar(id: number){
    this.router.navigate(['/produtos/detalhe', id])
  }

  limpar(){
    this.seletor = new ProdutoSeletor();
  }

  excluir(id: number){
    Swal.fire({
      title: 'Você está certo disso?',
      text: 'Deseja excluir o produto #' + id + "?",
      icon: 'warning',
      showCancelButton: true,
    }).then(r => {
      this.produtoService.excluir(id).subscribe(
        sucesso => {
          Swal.fire("Sucesso", "Produto excluido com sucesso!", 'success');
          this.buscarProdutos();
        },
        erro => {
          Swal.fire("Erro", "Erro ao excluir o produto: " + erro, 'error')
        }
      )
    })
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

  pesquisar(){
    this.produtoService.listarTodosComFiltro(this.seletor).subscribe(
      resultado => {
        this.produtos = resultado;
      },
      erro => {
        console.log('Erro ao buscar Produtos com filtro', erro);
      }
    )

  }

}
