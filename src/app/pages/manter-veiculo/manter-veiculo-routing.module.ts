import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManterVeiculoPage } from './manter-veiculo.page';

const routes: Routes = [
  {
    path: '',
    component: ManterVeiculoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManterVeiculoPageRoutingModule {}
