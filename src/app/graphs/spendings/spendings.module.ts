import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SpendingsPageRoutingModule } from './spendings-routing.module';

import { SpendingsPage } from './spendings.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SpendingsPageRoutingModule
  ],
  declarations: [SpendingsPage]
})
export class SpendingsPageModule {}
