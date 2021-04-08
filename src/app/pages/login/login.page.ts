import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  
  usu: { cpf, senha } = { cpf: "", senha: "" };

  constructor(public nav: NavController) { }
  
  ngOnInit() {
  }

  navegar(rota){
    this.nav.navigateForward(rota);
  }

}
