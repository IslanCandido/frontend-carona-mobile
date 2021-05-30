import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManterContatoPage } from './manter-contato.page';

const routes: Routes = [
  {
    path: '',
    component: ManterContatoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManterContatoPageRoutingModule {}
