import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProdutosModule } from './produtos/produtos.module';

const routes: Routes = [
  {path: "", redirectTo:'produtos/lista', pathMatch:'full'},
  {
    path: 'produtos',
    loadChildren:() => import('./produtos/produtos.module').then(m=>m.ProdutosModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
