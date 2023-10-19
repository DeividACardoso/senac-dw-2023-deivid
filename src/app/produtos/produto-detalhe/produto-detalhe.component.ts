import { Produto } from 'src/app/shared/model/produto';
import { FabricanteService } from './../../shared/service/fabricante.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Fabricante } from 'src/app/shared/model/fabricante';
import { ProdutoService } from 'src/app/shared/service/produto.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-produto-detalhe',
  templateUrl: './produto-detalhe.component.html',
  styleUrls: ['./produto-detalhe.component.scss']
})
export class ProdutoDetalheComponent  implements OnInit{

  public produto: Produto = new Produto();
  public fabricantes: Fabricante[] = [];
  public idProduto: number;

  @ViewChild('ngForm')
  public ngForm: NgForm;

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

public salvar(form: NgForm){
  if(form.invalid){
    Swal.fire("Erro", "Formulário inválido", 'error');
    return;
  }

  if(this.idProduto){
    this.atualizar();
  } else {
    this.inserirProduto();
  }
}
  inserirProduto() {
    this.produtoService.salvar(this.produto).subscribe(
      sucesso => {
        Swal.fire("Sucesso", "Produto salvo com sucesso", 'success');
        this.produto = new Produto();
      },
      erro => {
        Swal.fire("Erro", "Não foi possivel salvar o produto: " + erro, 'error');
      }
    )
  }
  atualizar() {
    this.produtoService.atualizar(this.produto).subscribe(
      sucesso => {
        Swal.fire("Sucesso", "Produto atualizado com sucesso", 'success');
      },
      erro => {
        Swal.fire("Erro", "Não foi possivel atualizar o produto: " + erro, 'error');
      }
    );
  }

public voltar(){
  this.router.navigate(['/produtos/lista']);
}

public compareById(r1: any, r2: any): boolean{
  return r1 && r2 ? r1.id === r2.id : r1 === r2;
}
}
