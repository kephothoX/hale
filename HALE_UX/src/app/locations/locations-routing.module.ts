import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LocationsComponent } from './locations.component';

import { ViewComponent } from './view/view.component';
import { BookingsComponent } from '../bookings/bookings.component';


const routes: Routes = [
  { path: '', title: 'Locations', component: LocationsComponent },
  { path: 'view/:id', title: 'View Location', component: ViewComponent },
  { path: 'appointments/:id', title: 'Appointments', component: BookingsComponent },
  
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LocationsRoutingModule { }
