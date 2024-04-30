import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistryComponent } from './registry.component';

import { NewRegistrantComponent } from './new-registrant/new-registrant.component';
import { EditRegistrantComponent } from './edit-registrant/edit-registrant.component';

const routes: Routes = [
  { path: '', title: 'Registry', component: RegistryComponent },
  { path: 'registrant/new', title: 'New Registrant', component: NewRegistrantComponent },
  { path: 'registrants/edit/:id', title: 'Edit Registrant', component: EditRegistrantComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistryRoutingModule { }
