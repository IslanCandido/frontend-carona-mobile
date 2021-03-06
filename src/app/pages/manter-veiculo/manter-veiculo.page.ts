import { ToastController } from '@ionic/angular';
import { VeiculoServiceService } from './../../services/veiculo/veiculo-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manter-veiculo',
  templateUrl: './manter-veiculo.page.html',
  styleUrls: ['./manter-veiculo.page.scss'],
})
export class ManterVeiculoPage implements OnInit {

  veiculo: { id, placa, renavam, modelo, cor, ano_fabricacao, tipo, capacidade, usuario } =
    { id: null, placa: "", renavam: "", modelo: "", cor: "", ano_fabricacao: null, tipo: "", capacidade: null, usuario: { id: null, nome: "", email: "", cpf: "", dt_nascimento: "", sexo: "", senha: "" } };

  veiculos;
  usuarios;

  consultaPlaca;

  constructor(private veiculoService: VeiculoServiceService, public toastController: ToastController) { }

  ngOnInit() {
    this.veiculoService.getUsuarios().subscribe(resultado => { this.usuarios = resultado })
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

  salvar(form) {
    this.veiculoService.getPlacaIgual(this.veiculo.placa).subscribe(p => {
      if (p) {
        if (this.veiculo.id === null) {
          this.presentToast('Placa ja foi cadastrado no sistema!');
        } else {
          this.veiculoService.getRenavamIgual(this.veiculo.renavam).subscribe(r => {
            if (r) {
              if (this.veiculo.id === null) {
                this.presentToast('Renavam ja foi cadastrado no sistema!');
              } else {
                if (this.isRenavam(this.veiculo.renavam) && this.isCPF(this.veiculo.usuario.cpf)) {
                  this.veiculoService.getCpfExiste(this.veiculo.usuario.cpf).subscribe(c => {
                    if (c) {
                      this.veiculoService.post(this.veiculo).subscribe(resultado => {
                        this.limpar(form);
                        this.presentToast('Ve??culo salvo com sucesso!');
                      });
                    } else {
                      this.presentToast('CPF n??o existe no sistema!');
                    }
                  });
                } else {
                  if (!this.isRenavam(this.veiculo.renavam)) {
                    this.presentToast('Renavam inv??lido!');
                  }
                  if (!this.isCPF(this.veiculo.usuario.cpf)) {
                    this.presentToast('CPF inv??lido!');
                  }
                }
              }
            } else {
              if (this.isRenavam(this.veiculo.renavam) && this.isCPF(this.veiculo.usuario.cpf)) {
                this.veiculoService.getCpfExiste(this.veiculo.usuario.cpf).subscribe(c => {
                  if (c) {
                    this.veiculoService.post(this.veiculo).subscribe(resultado => {
                      this.limpar(form);
                      this.presentToast('Ve??culo salvo com sucesso!');
                    });
                  } else {
                    this.presentToast('CPF n??o existe no sistema!');
                  }
                });
              } else {
                if (!this.isRenavam(this.veiculo.renavam)) {
                  this.presentToast('Renavam inv??lido!');
                }
                if (!this.isCPF(this.veiculo.usuario.cpf)) {
                  this.presentToast('CPF inv??lido!');
                }
              }
            }
          });
        }
      } else {
        this.veiculoService.getRenavamIgual(this.veiculo.renavam).subscribe(r => {
          if (r) {
            if (this.veiculo.id === null) {
              this.presentToast('Renavam ja foi cadastrado no sistema!');
            } else {
              if (this.isRenavam(this.veiculo.renavam) && this.isCPF(this.veiculo.usuario.cpf)) {
                this.veiculoService.getCpfExiste(this.veiculo.usuario.cpf).subscribe(c => {
                  if (c) {
                    this.veiculoService.post(this.veiculo).subscribe(resultado => {
                      this.limpar(form);
                      this.presentToast('Ve??culo salvo com sucesso!');
                    });
                  } else {
                    this.presentToast('CPF n??o existe no sistema!');
                  }
                });
              } else {
                if (!this.isRenavam(this.veiculo.renavam)) {
                  this.presentToast('Renavam inv??lido!');
                }
                if (!this.isCPF(this.veiculo.usuario.cpf)) {
                  this.presentToast('CPF inv??lido!');
                }
              }
            }
          } else {
            if (this.isRenavam(this.veiculo.renavam) && this.isCPF(this.veiculo.usuario.cpf)) {
              this.veiculoService.getCpfExiste(this.veiculo.usuario.cpf).subscribe(c => {
                if (c) {
                  this.veiculoService.post(this.veiculo).subscribe(resultado => {
                    this.limpar(form);
                    this.presentToast('Ve??culo salvo com sucesso!');
                  });
                } else {
                  this.presentToast('CPF n??o existe no sistema!');
                }
              });
            } else {
              if (!this.isRenavam(this.veiculo.renavam)) {
                this.presentToast('Renavam inv??lido!');
              }
              if (!this.isCPF(this.veiculo.usuario.cpf)) {
                this.presentToast('CPF inv??lido!');
              }
            }
          }
        });
      }
    });
  }

  excluir(id, form) {
    this.veiculoService.delete(id).subscribe(resultado => {
      this.limpar(form);
      this.presentToast('Ve??culo removido com sucesso!');
    });
    this.presentToast('Ve??culo n??o pode ser removido!');
  }

  consultar(placa) {
    console.log(placa);
    if (placa != null && placa !== '') {
      this.veiculoService.getByPlaca(placa).subscribe(dados => {
        if (!dados) {
          this.presentToast('Ve??culo n??o encontrado!');
          this.veiculo = { id: null, placa: "", renavam: "", modelo: "", cor: "", ano_fabricacao: "", tipo: "", capacidade: "", usuario: { id: null, nome: "", email: "", cpf: "", dt_nascimento: "", sexo: "", senha: "" } };
        } else {
          this.veiculo = {
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
        }
      });
    }
  }

  consultarUsuario(cpf) {
    if (cpf != null && cpf !== '') {
      this.veiculoService.getByCpf(cpf).subscribe(dados => {
        this.veiculo.usuario = {
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
      this.veiculo.usuario = { id: null, nome: "", email: "", cpf: "", dt_nascimento: "", sexo: "", senha: "" };
    }
  }

  limpar(form) {
    form.reset();
    this.veiculo = {
      id: null, placa: "", renavam: "", modelo: "", cor: "", ano_fabricacao: null, tipo: "", capacidade: null,
      usuario: { id: null, nome: "", email: "", cpf: "", dt_nascimento: "", sexo: "", senha: "" }
    };
    this.consultaPlaca = '';
    this.consultarUsuario(localStorage.getItem('usuario'));
  }

  isRenavam(renavam) {
    var renavamSemDigito = renavam.substring(0, 10);
    var renavamReversoSemDigito = renavamSemDigito.split("").reverse().join("");

    var soma = 0;
    var multiplicador = 2;
    for (var i = 0; i < 10; i++) {
      var algarismo = renavamReversoSemDigito.substring(i, i + 1);
      soma += algarismo * multiplicador;

      if (multiplicador >= 9) {
        multiplicador = 2;
      } else {
        multiplicador++;
      }
    }
    var mod11 = soma % 11;
    var ultimoDigitoCalculado = 11 - mod11;
    ultimoDigitoCalculado = (ultimoDigitoCalculado >= 10 ? 0 : ultimoDigitoCalculado);
    var digitoRealInformado = parseInt(renavam.substring(renavam.length - 1, renavam.length));

    if (ultimoDigitoCalculado === digitoRealInformado) {
      return true;
    }
    return false;
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
