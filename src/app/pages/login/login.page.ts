import { Component, OnInit } from '@angular/core';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { UsuarioServiceService } from 'src/app/services/usuario/usuario-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  usu: { cpf, senha } = { cpf: "", senha: "" };

  email: { remetente, destinatario, assunto, corpo } =
    { remetente: '', destinatario: '', assunto: '', corpo: '' };

  descEmail;

  constructor(public nav: NavController,
    private usuarioService: UsuarioServiceService,
    public toastController: ToastController,
    public alertController: AlertController) { }

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

  async presentToastRecuperarConta() {
    const alert = await this.alertController.create({
      header: 'Redefinir Senha',
      inputs: [
        {
          name: 'email',
          type: 'email',
          placeholder: 'Informe seu email'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            this.descEmail = '';
          }
        },
        {
          text: 'Enviar',
          handler: (dados) => {
            this.descEmail = dados.email
            this.recuperar();
          }
        }
      ]
    });
    await alert.present();

    const { role } = await alert.onDidDismiss();
  }

  recuperarConta() {
    this.presentToastRecuperarConta();
  }

  recuperar() {
    this.email = {
      remetente: 'runsistemadecarona@gmail.com', destinatario: this.descEmail,
      assunto: 'Recuperação de Conta.',
      corpo: 'Alguém, espero que você, solicitou a redefinição da senha da sua conta RUN - Sistema de carona.\n\n'
        + 'Se você não realizou essa solicitação, pode ignorar este e-mail com segurança.\n'
        + 'Caso contrário, clique no link abaixo para concluir o processo.\n\n'
        + 'http://localhost:4200/recuperar-conta'
    }
    this.presentToast('Email Enviado!');

    this.usuarioService.enviarMensagem(this.email).subscribe(r => {
      this.email = { remetente: '', destinatario: '', assunto: '', corpo: '' };
    });
  }

  navegar(rota) {
    this.usuarioService.autenticar(this.usu.cpf, this.usu.senha).subscribe(r => {
      if (r) {
        localStorage.removeItem('usuario');
        localStorage.setItem('usuario', this.usu.cpf);
        this.nav.navigateForward(rota);
      } else {
        this.presentToast('Usuário ou Senha incorretos!');
      }
    });
  }

}
