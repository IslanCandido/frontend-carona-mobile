import { Component } from '@angular/core';
import { UsuarioServiceService } from './services/usuario/usuario-service.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  public appPagesCadastros = [
    { title: 'Home', url: '/home', icon: 'home' },
    { title: 'Manter Usuário', url: '/manter-usuario', icon: 'people' },
    { title: 'Manter Veículo', url: '/manter-veiculo', icon: 'car' },
    { title: 'Manter Rota', url: '/manter-rota', icon: 'location' }
  ];

  public appPages = [
    { title: 'Buscar Rotas', url: '/buscar-rota', icon: 'earth' },
    { title: 'Pedir Carona', url: '/registrar-carona', icon: 'map' },
    { title: 'Confirmar Carona', url: '/confirmar-carona', icon: 'checkmark-circle' },
  ];

  usuario: { id, nome, email, cpf, dt_nascimento, sexo, senha } =
    { id: null, nome: "", email: "", cpf: "", dt_nascimento: "", sexo: "", senha: "" };

  constructor(public usuarioService: UsuarioServiceService) { }

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
