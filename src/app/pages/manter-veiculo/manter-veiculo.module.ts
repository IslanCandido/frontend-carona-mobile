import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ManterVeiculoPageRoutingModule } from './manter-veiculo-routing.module';

import { ManterVeiculoPage } from './manter-veiculo.page';

import {NgxMaskIonicModule} from 'ngx-mask-ionic'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ManterVeiculoPageRoutingModule,
    NgxMaskIonicModule
  ],
  declarations: [ManterVeiculoPage]
})
export class ManterVeiculoPageModule {}
