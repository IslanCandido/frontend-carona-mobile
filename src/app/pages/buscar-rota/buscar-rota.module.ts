import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BuscarRotaPageRoutingModule } from './buscar-rota-routing.module';

import { BuscarRotaPage } from './buscar-rota.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BuscarRotaPageRoutingModule
  ],
  declarations: [BuscarRotaPage]
})
export class BuscarRotaPageModule {}
