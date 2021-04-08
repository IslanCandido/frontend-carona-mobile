import { Component, OnInit } from '@angular/core';

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


  constructor() { }

  ngOnInit() {
  }

  salvar(form) {
    console.log(this.carona);
    this.limpar(form);
  }

  excluir(id, form){
    this.limpar(form);
  }

  limpar(form) {
    form.reset();
  }
}
