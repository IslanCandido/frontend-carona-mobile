import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { UsuarioServiceService } from 'src/app/services/usuario/usuario-service.service';

@Component({
  selector: 'app-recuperar-conta',
  templateUrl: './recuperar-conta.page.html',
  styleUrls: ['./recuperar-conta.page.scss'],
})
export class RecuperarContaPage implements OnInit {

  constructor(public nav: NavController,
    public usuarioService: UsuarioServiceService,
    public toastController: ToastController) { }

  usuario: { id, nome, email, cpf, dt_nascimento, sexo, senha } =
    { id: null, nome: "", email: "", cpf: "", dt_nascimento: "", sexo: "", senha: "" };

  email: { remetente, destinatario, assunto, corpo } =
    { remetente: '', destinatario: '', assunto: '', corpo: '' };

  confirmarSenha;

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

  recuperar(form) {
    if (this.usuario.senha === this.confirmarSenha) {
      this.usuarioService.post(this.usuario).subscribe(resultado => {
        this.email = {
          remetente: 'runsistemadecarona@gmail.com', destinatario: this.usuario.email,
          assunto: 'Recuperação de Conta realizada!',
          corpo: 'Olá ' + this.usuario.nome + '\n\nAviso: A recuperação da sua conta foi feita com sucesso!\natt: RUN - Sistema de Carona'
        }
        this.presentToast('Conta recuperada!');
        this.limpar(form);

        this.usuarioService.enviarMensagem(this.email).subscribe(r => {
          this.email = { remetente: '', destinatario: '', assunto: '', corpo: '' };
        });
      });
    } else {
      this.presentToast('Senhas são incompativeis.');
    }
  }

  consultar(cpf) {
    this.usuarioService.getByCpf(cpf).subscribe(dados => {
      if (!dados) {
        this.presentToast('Usuário não encontrado.');
        this.usuario = { id: null, nome: "", email: "", cpf: "", dt_nascimento: "", sexo: "", senha: "" };
      } else {
        this.usuario = {
          id: dados.id,
          nome: dados.nome,
          email: dados.email,
          cpf: dados.cpf,
          dt_nascimento: dados.dt_nascimento,
          sexo: dados.sexo,
          senha: ""
        };
      }
    });
  }

  limpar(form) {
    form.reset();
    this.usuario = { id: null, nome: "", email: "", cpf: "", dt_nascimento: "", sexo: "", senha: "" };
  }

  voltarLogin() {
    this.nav.navigateForward('login');
  }
}
