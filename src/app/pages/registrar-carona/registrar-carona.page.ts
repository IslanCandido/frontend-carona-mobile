import { ToastController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { CaronaServiceService } from 'src/app/services/carona/carona-service.service';

@Component({
  selector: 'app-registrar-carona',
  templateUrl: './registrar-carona.page.html',
  styleUrls: ['./registrar-carona.page.scss'],
})
export class RegistrarCaronaPage implements OnInit {

  carona: { id, horario_aproximado, ponto_encontro, acompanhantes, situacao, observacao, rota, usuario, contribuicao } =
    {
      id: null, horario_aproximado: '', ponto_encontro: '', acompanhantes: '', situacao: '', observacao: '',
      rota: { id: null, data: "", horario: "", inicio: "", fim: "", status: "", verificador: "", veiculo: null, contribuicao: null },
      usuario: { id: null, nome: "", email: "", cpf: "", dt_nascimento: "", sexo: "", senha: "" },
      contribuicao: { id: null, tipo: "", valor: "" }
    };

  mensagem: { remetente, destinatario, assunto, corpo } =
    { remetente: '', destinatario: '', assunto: '', corpo: '' };

  caronas
  rotas
  usuarios
  contribuicoes

  consultaCarona

  constructor(private caronaService: CaronaServiceService,
    public toastController: ToastController) { }

  ngOnInit() {
    this.caronaService.getUsuarios().subscribe(resultado => { this.usuarios = resultado });
    this.caronaService.getContribuicoes().subscribe(resultado => { this.contribuicoes = resultado });

    this.consultarUsuario(localStorage.getItem('usuario'));
    this.consultarRota(localStorage.getItem('verificadorRotaSelecionada'));

    if (this.carona.situacao == "") {
      this.carona.situacao = "Em andamento";
    }
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
    if (this.carona.horario_aproximado.length === 5) {
      this.carona.horario_aproximado = this.carona.horario_aproximado + ":00";
    }

    this.caronaService.verificarCarona(this.carona.rota.verificador, this.carona.usuario.cpf).subscribe(r => {
      if (r) {
        if (this.carona.id === null) {
          this.presentToast('Pedido de Carona j?? foi feito por esse usu??rio!');
        } else {
          if (this.carona.situacao == "Carona confirmada") {
            this.presentToast('Pedido de carona j?? foi confirmado, ent??o n??o pode mais ser alterado!');
          } else {
            if (this.carona.usuario.cpf === this.carona.rota.veiculo.usuario.cpf) {
              this.presentToast('N??o ?? possivel fazer um pedido de carona para a sua rota!');
            } else {
              this.caronaService.post(this.carona).subscribe(resultado => {
                this.limpar(form);
                this.presentToast('Pedido de carona salva com sucesso!');
              });
            }
          }
        }
      } else {
        if (this.carona.situacao == "Carona confirmada") {
          this.presentToast('Pedido de carona j?? foi confirmado, ent??o n??o pode mais ser alterado!');
        } else {
          if (this.carona.usuario.cpf === this.carona.rota.veiculo.usuario.cpf) {
            this.presentToast('N??o ?? possivel fazer um pedido de carona para a sua rota!');
          } else {
            this.caronaService.post(this.carona).subscribe(resultado => {
              this.mensagem = {
                remetente: 'runsistemadecarona@gmail.com', destinatario: this.carona.rota.veiculo.usuario.email,
                assunto: 'Novo Pedido de Carona',
                corpo: 'Ol?? ' + this.carona.rota.veiculo.usuario.nome + '.' +
                  '\n\nAviso: Voc?? tem um novo pedido de carona na sua rota ' + this.carona.rota.verificador + ' com destino para '
                  + this.carona.rota.fim + '.\n\natt: RUN - Sistema de Carona'
              }
              this.caronaService.enviarMensagem(this.mensagem).subscribe(r => {
                this.mensagem = { remetente: '', destinatario: '', assunto: '', corpo: '' };
              });
              this.limpar(form);
              this.presentToast('Pedido de carona salva com sucesso!');
            });
          }
        }
      }
    });
  }

  excluir(id, form) {
    this.caronaService.delete(id).subscribe(resultado => {

      if (this.carona.situacao == "Carona confirmada") {
        this.presentToast('Como o seu pedido j?? havia sido confirmado,\n a exclus??o dele faz com que ele seja cancelado automaticamente');

        this.mensagem = {
          remetente: 'runsistemadecarona@gmail.com', destinatario: this.carona.rota.veiculo.usuario.email + '.',
          assunto: 'Carona Cancelada pelo passageiro',
          corpo: 'Ol?? ' + this.carona.rota.veiculo.usuario.nome +
            '\n\nAviso: O passageiro ' + this.carona.usuario.nome + ' cancelou a carona para '
            + this.carona.rota.fim + '.\n\natt: RUN - Sistema de Carona'
        }

        this.caronaService.enviarMensagem(this.mensagem).subscribe(r => {
          this.mensagem = { remetente: '', destinatario: '', assunto: '', corpo: '' };
        });
      } else {
        this.presentToast('Pedido de carona foi removido!');
      }
      this.limpar(form);
    });
  }

  consultarCarona(verificador) {
    this.caronaService.getCarona(verificador, localStorage.getItem('usuario')).subscribe(dados => {
      this.carona = {
        id: dados.id,
        horario_aproximado: dados.horario_aproximado,
        ponto_encontro: dados.ponto_encontro,
        acompanhantes: dados.acompanhantes,
        situacao: dados.situacao,
        observacao: dados.observacao,
        rota: dados.rota,
        usuario: dados.usuario,
        contribuicao: dados.contribuicao
      };
    });
    console.log(this.carona);
    this.consultarRota(this.carona.rota.verificador)
  }

  consultarRota(verificador) {
    if (verificador != null && verificador !== '') {
      this.caronaService.getByVerificador(verificador).subscribe(dados => {
        this.carona.rota = {
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
      });
    } else {
      this.carona.rota = {
        id: null, data: "", horario: "", inicio: "", fim: "", status: "", verificador: "",
        veiculo: { id: null, placa: "", renavam: "", modelo: "", cor: "", ano_fabricacao: null, tipo: "", capacidade: null, usuario: null },
        contribuicao: { id: null, tipo: "", valor: "" }
      };
    }
  }

  consultarUsuario(cpf) {
    if (cpf != null && cpf !== '') {
      this.caronaService.getByCpf(cpf).subscribe(dados => {
        this.carona.usuario = {
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
      this.carona.usuario = { id: null, nome: "", email: "", cpf: "", dt_nascimento: "", sexo: "", senha: "" };
    }
  }


  limpar(form) {
    form.reset();
    this.carona = {
      id: null, horario_aproximado: '', ponto_encontro: '', acompanhantes: '', situacao: '', observacao: '',
      rota: { id: null, data: "", horario: "", inicio: "", fim: "", status: "", verificador: "", veiculo: null, contribuicao: null },
      usuario: { id: null, nome: "", email: "", cpf: "", dt_nascimento: "", sexo: "", senha: "" },
      contribuicao: { id: null, tipo: "", valor: "" }
    };
    this.caronaService.getRotasDisponiveis("Disponivel", "2050-01-01").subscribe(resultado => { this.rotas = resultado });
    this.consultarUsuario(localStorage.getItem('usuario'));

    this.consultaCarona = '';
    this.carona.situacao = "Em andamento";
    this.carona.rota.verificador = localStorage.getItem('verificadorRotaSelecionada');
  }

  abrirCadastroCont() {
    localStorage.setItem('flagRota', "false");
    localStorage.setItem('flagCarona', "true");
  }

  atualizarCont() {
    this.caronaService.getContribuicoes().subscribe(resultado => { this.contribuicoes = resultado });
  }
}
