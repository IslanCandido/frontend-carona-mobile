import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistrarCaronaPage } from './registrar-carona.page';

const routes: Routes = [
  {
    path: '',
    component: RegistrarCaronaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistrarCaronaPageRoutingModule {}
