import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { NewLocationComponent } from './locations/new-location/new-location.component';
import { EditLocationComponent } from './locations/edit-location/edit-location.component';
import { NewSubscriptionComponent } from './subscriptions/new-subscription/new-subscription.component';
import { EditSubscriptionComponent } from './subscriptions/edit-subscription/edit-subscription.component';
import { ListComponent } from './subscriptions/list/list.component';
import { PaymentsComponent } from './payments/payments.component';


const routes: Routes = [
  { path: '', component: AdminComponent },
  { path: 'payments', title: 'Payments', component: PaymentsComponent },
  { path: 'add-subscription', redirectTo: '/subscriptions/new', pathMatch: 'full' },
  { path: 'locations/new', title: 'Add Location', component: NewLocationComponent },
  { path: 'locations/edit/:id', title: 'Update Location', component: EditLocationComponent},
  { path: 'subscriptions/new', title: 'New Subscription', component: NewSubscriptionComponent },
  { path: 'subscriptions/edit/:id', title: 'Update Subscription', component: EditSubscriptionComponent },
  { path: 'subscriptions', title: 'List Subscriptions', component: ListComponent },
  { path: 'vendors', loadChildren: () => import('../vendors/vendors.module').then(m => m.VendorsModule) },
  { path: 'team', loadChildren: () => import('../team/team.module').then(m => m.TeamModule) },
  { path: 'catalog', loadChildren: () => import('../catalog/catalog.module').then(m => m.CatalogModule) },
  { path: 'merchants', loadChildren: () => import('../merchants/merchants.module').then(m => m.MerchantsModule) },
  { path: 'bookings', loadChildren: () => import('../bookings/bookings.module').then(m => m.BookingsModule) },
  { path: 'payments', loadChildren: () => import('./payments/payments.module').then(m => m.PaymentsModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
