import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CaronaServiceService {

  constructor(private http: HttpClient) { }

  public get(): Observable<any> {
    return this.http.get("http://localhost:8080/caronas");
  }

  public getById(id): Observable<any> {
    return this.http.get(`http://localhost:8080/caronas/${id}`);
  }

  public getCarona(verificador, cpf): Observable<any> {
    return this.http.get(`http://localhost:8080/caronas/filter/${verificador}/${cpf}`);
  }

  public getCaronasEmAndamento(cpf, situacao): Observable<any> {
    return this.http.get(`http://localhost:8080/caronas/consulta/${cpf}/${situacao}`);
  }

  public verificarCarona(verificador, cpf): Observable<any> {
    return this.http.get(`http://localhost:8080/caronas/existe/${verificador}/${cpf}`);
  }

  public post(carona): Observable<any> {
    return this.http.post("http://localhost:8080/caronas", carona);
  }

  public delete(id): Observable<any> {
    return this.http.delete(`http://localhost:8080/caronas/${id}`);
  }

  public getRotasDisponiveis(status, data): Observable<any> {
    return this.http.get(`http://localhost:8080/rotas/filter/disponiveis/${status}/${data}`);
  }

  public getRotasPesquisada(status, fim, data): Observable<any> {
    return this.http.get(`http://localhost:8080/rotas/consulta/${status}/${fim}/${data}`)
  }

  public getByVerificador(verificador): Observable<any> {
    return this.http.get(`http://localhost:8080/rotas/${verificador}`);
  }

  public getUsuarios(): Observable<any> {
    return this.http.get("http://localhost:8080/usuarios");
  }

  public getByCpf(cpf): Observable<any> {
    return this.http.get(`http://localhost:8080/usuarios/${cpf}`);
  }

  public getContribuicoes(): Observable<any> {
    return this.http.get("http://localhost:8080/contribuições");
  }

  public getByIdContribuicoes(id): Observable<any> {
    return this.http.get(`http://localhost:8080/contribuições/${id}`);
  }

  public enviarMensagem(mensagem): Observable<any> {
    return this.http.post("http://localhost:8080/mensagens", mensagem);
  }

}
