import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EpharmacyComponent } from './epharmacy.component';

const routes: Routes = [{ path: '', title: 'EPharmacy', component: EpharmacyComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EpharmacyRoutingModule { }
