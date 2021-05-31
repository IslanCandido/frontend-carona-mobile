import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManterContribuicaoPage } from './manter-contribuicao.page';

const routes: Routes = [
  {
    path: '',
    component: ManterContribuicaoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManterContribuicaoPageRoutingModule {}
