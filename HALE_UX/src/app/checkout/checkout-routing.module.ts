import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutComponent } from './checkout.component';

import { CardsComponent } from './cards/cards.component';
import { PaymentsComponent } from './payments/payments.component';
import { NewCardComponent } from './new-card/new-card.component';
import { InvoicesComponent } from '../admin/payments/invoices/invoices.component';

const routes: Routes = [
  { path: '', title: 'Checkout', component: CheckoutComponent },

  { path: 'payments', title: 'Billing (Payments)', component: PaymentsComponent },
  { path: 'cards', title: 'Billing (Manage cards)', component: CardsComponent },
  { path: 'new-card', title: 'Billing (New Card)', component: NewCardComponent },
  { path: 'invoices', title: 'Request Payment', component: InvoicesComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CheckoutRoutingModule { }
