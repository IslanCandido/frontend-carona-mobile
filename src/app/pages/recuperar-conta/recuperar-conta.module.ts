import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecuperarContaPageRoutingModule } from './recuperar-conta-routing.module';

import { RecuperarContaPage } from './recuperar-conta.page';

import {NgxMaskIonicModule} from 'ngx-mask-ionic'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecuperarContaPageRoutingModule,
    NgxMaskIonicModule
  ],
  declarations: [RecuperarContaPage]
})
export class RecuperarContaPageModule {}
