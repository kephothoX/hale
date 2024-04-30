import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingsComponent } from './bookings.component';
import { NewComponent } from './new/new.component';

const routes: Routes = [
  { path: '', title: 'Bookings', component: BookingsComponent },
  { path: 'new', title: 'New Booking', component: NewComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookingsRoutingModule { }
