import { ProdutoSeletor } from './../model/seletor/produto.seletor';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produto } from 'src/app/shared/model/produto';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  public seletor: ProdutoSeletor = new ProdutoSeletor();
  private readonly API = 'http://localhost:8080/api/produtos';

  constructor(private httpClient: HttpClient) {}

  listarTodos(): Observable<Array<Produto>> {
    return this.httpClient.get<Array<Produto>>(this.API+'/todos');
  }

  listarTodosComFiltro(seletor: ProdutoSeletor): Observable<Array<Produto>>{
    return this.httpClient.post<Array<Produto>>(this.API+'/filtro', seletor);
  }

  salvar(produto: Produto): Observable<Produto> {
    return this.httpClient.post<Produto>(this.API, produto);
  }

  pesquisarPorId(id: number){
    return this.httpClient.get<Produto>(this.API + '/' + id);
  }

  atualizar(produto: Produto): Observable<Produto>{
    return this.httpClient.post<Produto>(this.API, produto)
  }

  excluir(id: number): Observable<Produto>{
    return this.httpClient.delete<Produto>(this.API + "/deletar-por-id/" + id);
  }
}
