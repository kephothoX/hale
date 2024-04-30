import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VendorsComponent } from './vendors.component';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';

const routes: Routes = [
  { path: '', title: 'Vendors', component: VendorsComponent },
  { path: 'new', title: 'New Vendor', component: NewComponent },
  { path: 'edit/:id', title: 'Edit Vendor', component: EditComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VendorsRoutingModule { }
