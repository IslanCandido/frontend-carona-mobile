import { UsuarioServiceService } from './../../services/usuario/usuario-service.service';
import { NavController, ToastController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registrar-usuario',
  templateUrl: './registrar-usuario.page.html',
  styleUrls: ['./registrar-usuario.page.scss'],
})
export class RegistrarUsuarioPage implements OnInit {

  usuario: { id, nome, email, cpf, dt_nascimento, sexo, senha } =
    { id: null, nome: "", email: "", cpf: "", dt_nascimento: "", sexo: "", senha: "" };

  constructor(public nav: NavController,
    public usuarioService: UsuarioServiceService,
    public toastController: ToastController) { }

  ngOnInit() {
  }

  async presentToast(mensagem: string) {
    const toast = await this.toastController.create({
      message: mensagem,
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }

  voltarLogin() {
    this.nav.navigateForward('login');
  }

  salvar(form) {
    this.usuarioService.getCpfIgual(this.usuario.cpf).subscribe(r => {
      if (r) {
        if (this.usuario.id === null) {
          this.presentToast('CPF existe no sistema, faça login ou recupere sua senha!');
        } else {
          this.usuarioService.post(this.usuario).subscribe(resultado => {
            this.limpar(form);
            this.presentToast('Usuário salvo com sucesso!');
          });
        }
      } else {
        if (this.isCPF(this.usuario.cpf)) {
          this.usuarioService.post(this.usuario).subscribe(resultado => {
            this.limpar(form);
            this.presentToast('Usuário salvo com sucesso!');
          });
        } else {
          this.presentToast('CPF inválido!');
        }
      }
    });
    this.nav.navigateForward('manter-usuario');
  }

  limpar(form) {
    form.reset();
    this.usuario = { id: null, nome: "", email: "", cpf: "", dt_nascimento: "", sexo: "", senha: "" };
  }

  isCPF(cpf) {
    if (typeof cpf !== "string") return false
    cpf = cpf.replace(/[\s.-]*/igm, '')
    if (
      !cpf ||
      cpf.length != 11 ||
      cpf == "00000000000" ||
      cpf == "11111111111" ||
      cpf == "22222222222" ||
      cpf == "33333333333" ||
      cpf == "44444444444" ||
      cpf == "55555555555" ||
      cpf == "66666666666" ||
      cpf == "77777777777" ||
      cpf == "88888888888" ||
      cpf == "99999999999"
    ) {
      return false
    }
    var soma = 0
    var resto
    for (var i = 1; i <= 9; i++)
      soma = soma + parseInt(cpf.substring(i - 1, i)) * (11 - i)
    resto = (soma * 10) % 11
    if ((resto == 10) || (resto == 11)) resto = 0
    if (resto != parseInt(cpf.substring(9, 10))) return false
    soma = 0
    for (var i = 1; i <= 10; i++)
      soma = soma + parseInt(cpf.substring(i - 1, i)) * (12 - i)
    resto = (soma * 10) % 11
    if ((resto == 10) || (resto == 11)) resto = 0
    if (resto != parseInt(cpf.substring(10, 11))) return false
    return true
  }
}
