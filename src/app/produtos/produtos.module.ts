import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProdutosRoutingModule } from './produtos-routing.module';
import { ProdutoListagemComponent } from './produto-listagem/produto-listagem.component';
import { FormsModule } from '@angular/forms'


@NgModule({
  declarations: [
    ProdutoListagemComponent
  ],
  imports: [
    CommonModule,
    ProdutosRoutingModule,
    FormsModule
  ]
})
export class ProdutosModule { }
