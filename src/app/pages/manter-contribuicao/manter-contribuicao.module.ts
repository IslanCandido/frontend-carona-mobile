import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ManterContribuicaoPageRoutingModule } from './manter-contribuicao-routing.module';

import { ManterContribuicaoPage } from './manter-contribuicao.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ManterContribuicaoPageRoutingModule
  ],
  declarations: [ManterContribuicaoPage]
})
export class ManterContribuicaoPageModule {}
