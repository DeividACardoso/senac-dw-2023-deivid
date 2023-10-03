import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produto } from 'src/app/shared/model/seletor/produto';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  private readonly API = 'http://localhost:8080/api/produtos';

  constructor(private httpClient: HttpClient) {}

  listarTodos(): Observable<Array<Produto>> {
    return this.httpClient.get<Array<Produto>>(this.API+'/todos');
  }


}
