import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ManterUsuarioPageRoutingModule } from './manter-usuario-routing.module';

import { ManterUsuarioPage } from './manter-usuario.page';

import {NgxMaskIonicModule} from 'ngx-mask-ionic'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ManterUsuarioPageRoutingModule,
    NgxMaskIonicModule
  ],
  declarations: [ManterUsuarioPage]
})
export class ManterUsuarioPageModule {}
