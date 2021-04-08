import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registrar-usuario',
  templateUrl: './registrar-usuario.page.html',
  styleUrls: ['./registrar-usuario.page.scss'],
})
export class RegistrarUsuarioPage implements OnInit {

  usuario: { id, nome, email, cpf, dt_nascimento, sexo, senha } =
    { id: null, nome: "", email: "", cpf: "", dt_nascimento: "", sexo: "", senha: "" };

  constructor(public nav: NavController) { }

  ngOnInit() {
  }

  voltarLogin() {
    this.nav.navigateForward('login');
  }

  salvar(form) {
    console.log(this.usuario);
    this.limpar(form);
  }

  limpar(form) {
    form.reset();
    this.usuario = { id: null, nome: "", email: "", cpf: "", dt_nascimento: "", sexo: "", senha: "" };
  }

}
