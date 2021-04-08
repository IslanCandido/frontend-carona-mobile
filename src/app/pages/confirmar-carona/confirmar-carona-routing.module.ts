import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfirmarCaronaPage } from './confirmar-carona.page';

const routes: Routes = [
  {
    path: '',
    component: ConfirmarCaronaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfirmarCaronaPageRoutingModule {}
