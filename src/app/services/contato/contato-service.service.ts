import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContatoServiceService {

  constructor(private http: HttpClient) { }

  public get(): Observable<any> {
    return this.http.get("http://localhost:8080/contatos");
  }

  public getById(id): Observable<any> {
    return this.http.get(`http://localhost:8080/contatos/${id}`);
  }

  public getContatos(cpf): Observable<any> {
    return this.http.get(`http://localhost:8080/contatos/filter/${cpf}`);
  }

  public getUsuarios(): Observable<any> {
    return this.http.get("http://localhost:8080/usuarios");
  }

  public getByCpf(cpf): Observable<any> {
    return this.http.get(`http://localhost:8080/usuarios/${cpf}`);
  }

  public getCpfExiste(cpf): Observable<any> {
    return this.http.get(`http://localhost:8080/usuarios/existe/${cpf}`);
  }

  public post(contatos: { id, tipo, telefone, usuario }): Observable<any> {
    return this.http.post("http://localhost:8080/contatos", contatos);
  }

  public delete(id): Observable<any> {
    return this.http.delete(`http://localhost:8080/contatos/${id}`);
  }

}
