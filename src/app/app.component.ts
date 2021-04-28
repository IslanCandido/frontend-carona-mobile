import { Component } from '@angular/core';
import { UsuarioServiceService } from './services/usuario/usuario-service.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Home', url: '/home', icon: 'home' },
    { title: 'Buscar Rotas', url: '/buscar-rota', icon: 'earth' },
    { title: 'Registrar Carona', url: '/registrar-carona', icon: 'car' },
    { title: 'Confirmar Carona', url: '/confirmar-carona', icon: 'checkmark-circle' },
  ];

  usuario: { id, nome, email, cpf, dt_nascimento, sexo, senha } =
    { id: null, nome: "", email: "", cpf: "", dt_nascimento: "", sexo: "", senha: "" };

  constructor(public usuarioService: UsuarioServiceService) {}

  ngOnInit() {
    this.consultarUsuario(localStorage.getItem('usuario'));
  }

  consultarUsuario(cpf) {
    if (cpf != null && cpf !== '') {
      this.usuarioService.getByCpf(cpf).subscribe(dados => {
        this.usuario = {
          id: dados.id,
          nome: dados.nome,
          email: dados.email,
          cpf: dados.cpf,
          dt_nascimento: dados.dt_nascimento,
          sexo: dados.sexo,
          senha: dados.senha
        };
      });
    } else {
      this.usuario = { id: null, nome: "", email: "", cpf: "", dt_nascimento: "", sexo: "", senha: "" };
    }
  }
}
