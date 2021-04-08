import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BuscarRotaPage } from './buscar-rota.page';

const routes: Routes = [
  {
    path: '',
    component: BuscarRotaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BuscarRotaPageRoutingModule {}
