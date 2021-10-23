import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SpendingsPage } from './spendings.page';

const routes: Routes = [
  {
    path: '',
    component: SpendingsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SpendingsPageRoutingModule {}
