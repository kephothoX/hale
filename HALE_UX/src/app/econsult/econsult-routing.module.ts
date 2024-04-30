import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EconsultComponent } from './econsult.component';

const routes: Routes = [
  { path: '', title: 'EConsult',  component: EconsultComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EconsultRoutingModule { }
