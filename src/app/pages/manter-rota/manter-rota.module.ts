import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ManterRotaPageRoutingModule } from './manter-rota-routing.module';

import { ManterRotaPage } from './manter-rota.page';

import {NgxMaskIonicModule} from 'ngx-mask-ionic'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ManterRotaPageRoutingModule,
    NgxMaskIonicModule
  ],
  declarations: [ManterRotaPage]
})
export class ManterRotaPageModule {}
