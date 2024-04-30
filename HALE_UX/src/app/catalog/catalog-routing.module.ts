import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogComponent } from './catalog.component';

import { NewComponent } from './new/new.component';

const routes: Routes = [
  { path: '', title: 'Catalog', component: CatalogComponent },
  { path: 'new', title: 'New Catalog', component: NewComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatalogRoutingModule { }
