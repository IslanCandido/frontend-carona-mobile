import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManterUsuarioPage } from './manter-usuario.page';

const routes: Routes = [
  {
    path: '',
    component: ManterUsuarioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManterUsuarioPageRoutingModule {}
