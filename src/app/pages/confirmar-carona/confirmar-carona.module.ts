import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConfirmarCaronaPageRoutingModule } from './confirmar-carona-routing.module';

import { ConfirmarCaronaPage } from './confirmar-carona.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConfirmarCaronaPageRoutingModule
  ],
  declarations: [ConfirmarCaronaPage]
})
export class ConfirmarCaronaPageModule {}
