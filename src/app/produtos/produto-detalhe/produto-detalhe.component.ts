import { Produto } from 'src/app/shared/model/produto';
import { FabricanteService } from './../../shared/service/fabricante.service';
import { Component, OnInit } from '@angular/core';
import { Fabricante } from 'src/app/shared/model/fabricante';
import { ProdutoService } from 'src/app/shared/service/produto.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-produto-detalhe',
  templateUrl: './produto-detalhe.component.html',
  styleUrls: ['./produto-detalhe.component.scss']
})
export class ProdutoDetalheComponent  implements OnInit{

  public produto: Produto = new Produto();
  public fabricantes: Fabricante[] = [];

  constructor(private produtoService : ProdutoService,
              private fabricanteService: FabricanteService,
              private router: Router) {}

  ngOnInit(): void {
    this.fabricanteService.listarTodos().subscribe(
      resultado => {
        this.fabricantes = resultado;
      },
      erro => {
        console.log('Erro ao buscar Produtos', erro);
      }
    )
  }
public CompareById(r1: any, r2: any): boolean{
  return r1 && r2 ? r1.id === r2.id : r1 === r2;
}
}
