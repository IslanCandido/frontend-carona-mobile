import { ToastController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { RotaServiceService } from 'src/app/services/rota/rota-service.service';

@Component({
  selector: 'app-manter-rota',
  templateUrl: './manter-rota.page.html',
  styleUrls: ['./manter-rota.page.scss'],
})
export class ManterRotaPage implements OnInit {

  rota: { id, data, horario, inicio, fim, status, verificador, veiculo, contribuicao } =
    {
      id: null, data: "", horario: "", inicio: "", fim: "", status: "", verificador: "",
      veiculo: { id: null, placa: "", renavam: "", modelo: "", cor: "", ano_fabricacao: null, tipo: "", capacidade: null, usuario: null },
      contribuicao: { id: null, tipo: "", valor: "" }
    };

  email: { remetente, destinatario, assunto, corpo } = { remetente: '', destinatario: '', assunto: '', corpo: '' };

  rotas;
  veiculos;
  contribuicoes;

  consultaCodVer;

  constructor(private rotaService: RotaServiceService, public toastController: ToastController) { }

  ngOnInit() {
    this.rotaService.getContribuicoes().subscribe(resultado => { this.contribuicoes = resultado });
    this.rotaService.getVeiculos().subscribe(resultado => { this.veiculos = resultado });
    this.gerarVerificador();
    this.consultarVeiculo(this.rota.veiculo.placa);

  }

  async presentToast(mensagem: string) {
    const toast = await this.toastController.create({
      message: mensagem,
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }

  salvar(form) {
    this.consultarVeiculo(this.rota.veiculo.placa);
    console.log(this.rota);
    if (this.rota.horario.length === 5) {
      this.rota.horario = this.rota.horario + ":00";
    }
    if (this.rota.verificador === '' || this.rota.verificador === null) {
      this.rota.verificador = this.gerarVerificador();
    }

    this.rotaService.getVerificadorIgual(this.rota.verificador).subscribe(r => {
      if (r) {
        if (this.rota.id === null) {
          this.presentToast('Código Verificador já está sendo usado em outra rota!');

        } else {
          this.rotaService.getPlacaExiste(this.rota.veiculo.placa).subscribe(p => {
            if (p) {
              this.rotaService.post(this.rota).subscribe(resultado => {
                this.limpar(form);
                this.presentToast('Rota salva com sucesso!');
              });
            } else {
              this.presentToast('Placa não existe no sistema!');
            }
          });
        }
      } else {
        this.rotaService.getPlacaExiste(this.rota.veiculo.placa).subscribe(p => {
          if (p) {
            this.rotaService.post(this.rota).subscribe(resultado => {
              this.email = {
                remetente: 'runsistemadecarona@gmail.com', destinatario: this.rota.veiculo.usuario.email,
                assunto: 'Código da sua rota',
                corpo: 'Olá ' + this.rota.veiculo.usuario.nome + '.' +
                  '\n\nRecentemente você cadastrou uma rota no nosso sistema de carona.' +
                  '\nCada rota tem o seu código verificador, e ele é muito importante para que possa alterar ou excluir sua rota futuramente.' +
                  '\nEsse é o código verificador da sua rota com destino para ' + this.rota.fim +
                  '\n\n COD: ' + this.rota.verificador
                  + '.\n\natt: RUN - Sistema de Carona.'
              }

              this.rotaService.enviarMensagem(this.email).subscribe(r => {
                this.email = { remetente: '', destinatario: '', assunto: '', corpo: '' };
              });

              this.limpar(form);
              this.presentToast('Rota salva com sucesso!');
            });
          } else {
            this.presentToast('Placa não existe no sistema!');
          }
        });
      }
    });
  }

  excluir(id, form) {
    this.rotaService.delete(id).subscribe(resultado => {
      this.limpar(form);
      this.presentToast('Rota removida com sucesso!');
    });
  }

  consultar(verificador) {
    if (verificador != null && verificador !== '') {
      this.rotaService.getByVerificador(verificador).subscribe(dados => {
        if (!dados) {
          this.presentToast('Rota não encontrada!');
          this.rota = {
            id: null, data: "", horario: "", inicio: "", fim: "", status: "", verificador: "",
            veiculo: { id: null, placa: "", renavam: "", modelo: "", cor: "", ano_fabricacao: null, tipo: "", capacidade: null, usuario: null },
            contribuicao: { id: null, tipo: "", valor: "" }
          };
        } else {
          this.rota = {
            id: dados.id,
            data: dados.data,
            horario: dados.horario,
            inicio: dados.inicio,
            fim: dados.fim,
            status: dados.status,
            verificador: dados.verificador,
            veiculo: dados.veiculo,
            contribuicao: dados.contribuicao
          };
        }

      });
    }
  }

  consultarVeiculo(placa) {
    if (placa != null && placa !== '') {
      this.rotaService.getByPlaca(placa).subscribe(dados => {
        this.rota.veiculo = {
          id: dados.id,
          placa: dados.placa,
          renavam: dados.renavam,
          modelo: dados.modelo,
          cor: dados.cor,
          ano_fabricacao: dados.ano_fabricacao,
          tipo: dados.tipo,
          capacidade: dados.capacidade,
          usuario: dados.usuario
        };
      });
    } else {
      this.rota.veiculo = { id: null, placa: "", renavam: "", modelo: "", cor: "", ano_fabricacao: "", tipo: "", capacidade: "", usuario: { id: null, nome: "", email: "", cpf: "", dt_nascimento: "", sexo: "", senha: "" } };
    }
    console.log(this.rota.veiculo);
  }

  limpar(form) {
    form.reset();
    this.rota = {
      id: null, data: "", horario: "", inicio: "", fim: "", status: "", verificador: "",
      veiculo: { id: null, placa: "", renavam: "", modelo: "", cor: "", ano_fabricacao: null, tipo: "", capacidade: null, usuario: null },
      contribuicao: { id: null, tipo: "", valor: "" }
    }
    this.consultaCodVer = '';
    this.gerarVerificador();
  }

  gerarVerificador() {
    let cod = '';

    do {
      cod += Math.random().toString(36).substr(2);
    } while (cod.length < 8);

    cod = cod.substr(0, 8);
    cod.toLowerCase();

    this.rota.verificador = cod;

  }

  getData(data) {
    data = new Date();
    var dy = data.getDate() + 1;
    var mt = data.getMonth() + 1;
    var yr = data.getFullYear();

    return yr + "-" + mt + "-" + dy;
  }

  getDataAtual() {
    var today = new Date();
    var dy = today.getDate();
    var mt = today.getMonth() + 1;
    var yr = today.getFullYear();
    return yr + "-" + mt + "-" + dy;
  }
}
