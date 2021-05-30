import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ManterContatoPageRoutingModule } from './manter-contato-routing.module';

import { ManterContatoPage } from './manter-contato.page';

import {NgxMaskIonicModule} from 'ngx-mask-ionic'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ManterContatoPageRoutingModule,
    NgxMaskIonicModule
  ],
  declarations: [ManterContatoPage]
})
export class ManterContatoPageModule {}
