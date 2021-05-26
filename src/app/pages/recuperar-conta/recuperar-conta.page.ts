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

  email: { remetente, destinatario, assunto, corpo } =
    { remetente: '', destinatario: '', assunto: '', corpo: '' };

  descEmail

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
    this.email = {
      remetente: 'runsistemadecarona@gmail.com', destinatario: this.descEmail,
      assunto: 'Recuperação de Conta.',
      corpo: 'Alguém, espero que você, solicitou a redefinição da senha da sua conta RUN - Sistema de carona.\n\n'
        + 'Se você não realizou essa solicitação, pode ignorar este e-mail com segurança.\n'
        + 'Caso contrário, clique no link abaixo para concluir o processo.\n\n'
        + 'http://localhost:4200/recuperar-conta'
    }
    this.presentToast('Email Enviado!');
    this.limpar(form);

    this.usuarioService.enviarMensagem(this.email).subscribe(r => {
      this.email = { remetente: '', destinatario: '', assunto: '', corpo: '' };
    });
  }

  limpar(form) {
    this.descEmail = '';
    form.reset();
  }

  voltarLogin() {
    this.nav.navigateForward('login');
  }
}
