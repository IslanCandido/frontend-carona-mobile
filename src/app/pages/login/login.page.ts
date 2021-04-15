import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { UsuarioServiceService } from 'src/app/services/usuario/usuario-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  usu: { cpf, senha } = { cpf: "", senha: "" };

  constructor(public nav: NavController,
    private usuarioService: UsuarioServiceService,
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

  navegar(rota) {
    this.usuarioService.autenticar(this.usu.cpf, this.usu.senha).subscribe(r => {
      if (r) {
        localStorage.setItem('usuario', this.usu.cpf);
        this.nav.navigateForward(rota);
      } else {
        this.presentToast('Usuário ou Senha incorretos!');
      }
    });
  }

}
