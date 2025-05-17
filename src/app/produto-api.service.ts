import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Produto } from './produto';

const BASE_API = 'http://localhost:3000/api/produtos';
const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type":"application/json"  
  })
}

@Injectable({
  providedIn: 'root'
})
export class ProdutoApiService {

  constructor(private http: HttpClient) { }

  listar(): Observable<Produto[]> {
    this.updateToken();
    return this.http.get<Produto[]>(BASE_API, httpOptions);
  }

  buscarPorId(id: number): Observable<Produto> {
    this.updateToken();    
    return this.http.get<Produto>(`${BASE_API}/${id}`, httpOptions);
  }

  inserir(produto: Produto): Observable<Produto> {
    this.updateToken();
    return this.http.post<Produto>(BASE_API, produto, httpOptions);
  }

  editar(id: number, produto: Produto): Observable<Produto> {
    const uri = BASE_API+'/'+id;
    this.updateToken();
    return this.http.put<Produto>(uri, produto, httpOptions);
  }

  
  deletar(id?: number): Observable<Produto> {
    this.updateToken();
    return this.http.delete<Produto>(`${BASE_API}/${id}`, httpOptions);
  }

  updateToken() {
    let token = sessionStorage.getItem("token");
    if(!token){
      token = "";
    }
    console.log(token);
    httpOptions.headers = new HttpHeaders({
      "Content-Type":"application/json",
      "token": token
    })
  }
}
