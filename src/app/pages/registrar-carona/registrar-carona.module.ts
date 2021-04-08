import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistrarCaronaPageRoutingModule } from './registrar-carona-routing.module';

import { RegistrarCaronaPage } from './registrar-carona.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistrarCaronaPageRoutingModule
  ],
  declarations: [RegistrarCaronaPage]
})
export class RegistrarCaronaPageModule {}
