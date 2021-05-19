import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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

  public getByCpf(cpf): Observable<any> {
    return this.http.get(`http://localhost:8080/usuarios/${cpf}`);
  }

  public post(usuario) {
    return this.http.post(`http://localhost:8080/usuarios`, usuario);
  }

  public delete(id): Observable<any> {
    return this.http.delete(`http://localhost:8080/usuarios/${id}`);
  }

  public autenticar(cpf, senha) {
    return this.http.get(`http://localhost:8080/usuarios/autenticar/${cpf}/${senha}`);
  }

  public enviarMensagem(mensagem: { remetente, destinatario, assunto, corpo }): Observable<any> {
    return this.http.post("http://localhost:8080/mensagens", mensagem);
  }
}
