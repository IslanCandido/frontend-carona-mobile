import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Home', url: '/home', icon: 'home' },
    { title: 'Buscar Rotas', url: '/buscar-rota', icon: 'earth' },
    { title: 'Registrar Carona', url: '/registrar-carona', icon: 'car' },
    { title: 'Confirmar Carona', url: '/confirmar-carona', icon: 'checkmark-circle' },
  ];
  constructor() {}
}
