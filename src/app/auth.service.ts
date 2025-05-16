import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';

const BASE_API = "http://localhost:3000/api/login";
const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json"
  })
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(usuario: String, senha: String): Observable<boolean>{
    const user = {
      usuario: usuario,
      senha: senha
    }
    return this.http.post<any>(BASE_API, user, httpOptions).pipe(
      tap((resp: any) => {
        if(resp && resp.token) {
          sessionStorage.setItem("token", resp.token)
          return true;
        }
        else {
          return false;
        }
      }),
      catchError(error => of(false))
    );
  }
}
