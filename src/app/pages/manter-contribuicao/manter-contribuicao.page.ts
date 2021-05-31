import { Component, OnInit } from '@angular/core';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { ContribuicaoServiceService } from 'src/app/services/contribuicao/contribuicao-service.service';

@Component({
  selector: 'app-manter-contribuicao',
  templateUrl: './manter-contribuicao.page.html',
  styleUrls: ['./manter-contribuicao.page.scss'],
})
export class ManterContribuicaoPage implements OnInit {

  contribuicao: { id, tipo, valor } = { id: null, tipo: "", valor: "" };
  contribuicoes;

  constructor(private contribuicoesService: ContribuicaoServiceService,
    public toastController: ToastController,
    public nav: NavController,
    public alertController: AlertController) { }

  ngOnInit() {
    this.contribuicoesService.get().subscribe(resultado => { this.contribuicoes = resultado });
  }

  async presentToast(mensagem: string) {
    const toast = await this.toastController.create({
      message: mensagem,
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }

  async presentToastExcluir(id, form) {
    const alert = await this.alertController.create({
      message: 'Deseja excluir essa contribuição?',
      cssClass: 'my-custom-class',
      header: 'Confirmar Exclusão',
      buttons: [
        {
          text: 'Excluir',
          handler: () => {
            this.excluir(id, form);
          }
        }, {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            this.limpar(form);
          }
        }
      ]
    });
    await alert.present();

    const { role } = await alert.onDidDismiss();
  }

  salvar(form) {
    this.contribuicoesService.post(this.contribuicao).subscribe(resultado => {
      this.limpar(form);
      this.presentToast('Contribuição salva com sucesso!');
    });

  }

  confirmarExclusao(id, form) {
    this.presentToastExcluir(id, form);
  }

  excluir(id, form) {
    this.contribuicoesService.delete(id).subscribe(resultado => {
      this.limpar(form);
      this.presentToast('Contribuição removida com sucesso!');
    });
    this.presentToast('Contribuição não pode ser removida, pois está sendo usada!');
  }

  consultar(id) {
    this.contribuicoesService.getById(id).subscribe(dados => {
      this.contribuicao = {
        id: dados.id,
        tipo: dados.tipo,
        valor: dados.valor
      };
    });
  }

  limpar(form) {
    form.reset();
    this.contribuicao = { id: null, tipo: "", valor: "" };
    this.contribuicoesService.get().subscribe(resultado => { this.contribuicoes = resultado });
  }

  voltar() {
    if (localStorage.getItem("flagRota") == "true" && localStorage.getItem("flagCarona") == "false") {
      this.nav.navigateForward('manter-rota');
    } else if (localStorage.getItem("flagRota") == "false" && localStorage.getItem("flagCarona") == "true") {
      this.nav.navigateForward('registrar-carona');
    }

  }
}
