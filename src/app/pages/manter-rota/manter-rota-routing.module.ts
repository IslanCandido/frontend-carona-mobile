import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManterRotaPage } from './manter-rota.page';

const routes: Routes = [
  {
    path: '',
    component: ManterRotaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManterRotaPageRoutingModule {}
