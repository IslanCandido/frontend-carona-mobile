import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistrarCaronaPageRoutingModule } from './registrar-carona-routing.module';

import { RegistrarCaronaPage } from './registrar-carona.page';
import { NgxMaskIonicModule } from 'ngx-mask-ionic'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistrarCaronaPageRoutingModule,
    NgxMaskIonicModule
  ],
  declarations: [RegistrarCaronaPage]
})
export class RegistrarCaronaPageModule { }
