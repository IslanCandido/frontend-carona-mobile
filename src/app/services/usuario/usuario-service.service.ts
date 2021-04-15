import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsuarioServiceService {

  constructor(private http: HttpClient) { }

  public get() {
    return this.http.get("http://localhost:8080/usuarios");
  }

  public getCpfIgual(cpf) {
    return this.http.get(`http://localhost:8080/usuarios/existe/${cpf}`);
  }

  public post(usuario) {
    return this.http.post(`http://localhost:8080/usuarios`, usuario);
  }

  public autenticar(cpf, senha) {
    return this.http.get(`http://localhost:8080/usuarios/autenticar/${cpf}/${senha}`);
  }
}
