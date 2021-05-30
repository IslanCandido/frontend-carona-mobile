import { AlertController, NavController, ToastController } from '@ionic/angular';
import { ContatoServiceService } from './../../services/contato/contato-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manter-contato',
  templateUrl: './manter-contato.page.html',
  styleUrls: ['./manter-contato.page.scss'],
})
export class ManterContatoPage implements OnInit {

  constructor(private contatoService: ContatoServiceService,
    public toastController: ToastController,
    public nav: NavController,
    public alertController: AlertController) { }

  contato: { id, tipo, telefone, usuario } = {
    id: null, tipo: "", telefone: "",
    usuario: { id_usu: null, nome: "", email: "", cpf: "", dt_nascimento: "", sexo: "", senha: "" }
  };

  contatos;
  usuarios;

  ngOnInit() {
    this.contatoService.getContatos(localStorage.getItem('usuario')).subscribe(resultado => { this.contatos = resultado });
    this.contatoService.getUsuarios().subscribe(resultado => { this.usuarios = resultado })

    this.consultarUsuario(localStorage.getItem('usuario'));
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
      message: 'Deseja excluir esse contato?',
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
    if (this.isCPF(this.contato.usuario.cpf)) {
      this.contatoService.getCpfExiste(this.contato.usuario.cpf).subscribe(r => {
        if (r) {
          this.contatoService.post(this.contato).subscribe(resultado => {
            this.limpar(form);
            this.presentToast('Contato salvo com sucesso!');
          });
        } else {
          this.presentToast('CPF não existe no sistema!');
        }
      });
    } else {
      this.presentToast('CPF inválido!');
    }
  }

  excluir(id, form) {
    this.contatoService.delete(id).subscribe(resultado => {
      this.limpar(form);
      this.presentToast('Contato removido com sucesso!');
    });
  }

  confirmarExclusao(id, form) {
    this.presentToastExcluir(id, form);
  }

  consultar(id) {
    this.contatoService.getById(id).subscribe(dados => {
      this.contato = {
        id: dados.id,
        tipo: dados.tipo,
        telefone: dados.telefone,
        usuario: dados.usuario
      };
    });
  }

  consultarUsuario(cpf) {
    if (cpf != null && cpf !== '') {
      this.contatoService.getByCpf(cpf).subscribe(dados => {
        this.contato.usuario = {
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
      this.contato.usuario = { id: null, nome: "", email: "", cpf: "", dt_nascimento: "", sexo: "", senha: "" };
    }
  }

  limpar(form) {
    form.reset();
    this.contato = {
      id: null, tipo: "", telefone: "",
      usuario: { id_usu: null, nome: "", email: "", cpf: "", dt_nascimento: "", sexo: "", senha: "" }
    };
    this.contatoService.getContatos(localStorage.getItem('usuario')).subscribe(resultado => { this.contatos = resultado });
    this.consultarUsuario(localStorage.getItem('usuario'));
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

  voltar() {
    this.nav.navigateForward('manter-usuario');
  }
}
