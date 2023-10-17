import { Produto } from 'src/app/shared/model/produto';
import { FabricanteService } from './../../shared/service/fabricante.service';
import { Component, OnInit } from '@angular/core';
import { Fabricante } from 'src/app/shared/model/fabricante';
import { ProdutoService } from 'src/app/shared/service/produto.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-produto-detalhe',
  templateUrl: './produto-detalhe.component.html',
  styleUrls: ['./produto-detalhe.component.scss']
})
export class ProdutoDetalheComponent  implements OnInit{

  public produto: Produto = new Produto();
  public fabricantes: Fabricante[] = [];
  public idProduto: number;

  constructor(private produtoService : ProdutoService,
              private fabricanteService: FabricanteService,
              private router: Router,
              private route: ActivatedRoute) {}

   ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.idProduto = params['id']; //'id' é o nome do parâmetro definido na rota

      if(this.idProduto){
        this.buscarProduto();
      }
    });

    this.fabricanteService.listarTodos().subscribe(
      resultado => {
        this.fabricantes = resultado;
      },
      erro => {
        console.log('Erro ao buscar Produtos', erro);
      }
    )
  }

  buscarProduto() {
    this.produtoService.pesquisarPorId(this.idProduto).subscribe(
      resultado => {
        this.produto = resultado;
      },
      erro => {
        Swal.fire("Erro", "Erro ao buscar com o produto com id (" + this.idProduto + ") : " + erro, 'error');
      }
    );
  }

public salvar(){
  if(this.idProduto){
    this.produtoService.atualizar(this.produto).subscribe(
      sucesso => {
        Swal.fire("Sucesso", "Produto atualizado!", 'success');
        this.produto = new Produto();
      },
      erro => {
        Swal.fire("Erro", "Erro ao atualizar o produto: " + erro, 'error');
      }
    );
  } else {
    this.produtoService.salvar(this.produto).subscribe(
      sucesso => {
        Swal.fire('Sucesso', 'Produto Cadastrado!', 'success');
        this.produto = new Produto();
      },
      erro => {
        Swal.fire("Erro", "Erro ao cadastrar o produto: " + erro, 'error')
      }
    )
  }
}

public voltar(){
  this.router.navigate(['/produtos/lista']);
}

public compareById(r1: any, r2: any): boolean{
  return r1 && r2 ? r1.id === r2.id : r1 === r2;
}
}
