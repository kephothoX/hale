import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubscriptionsComponent } from './subscriptions.component';
import { PauseComponent } from './pause/pause.component';
import { CancelComponent } from './cancel/cancel.component';
import { ResumeComponent } from './resume/resume.component';

const routes: Routes = [
  { path: '', component: SubscriptionsComponent },
  { path: 'invoices', title: 'My Invoices', component: SubscriptionsComponent },
  { path: 'pause', title: 'Pause Subscription', component: PauseComponent },
  { path: 'cancel', title: 'Cancel Subscription', component: CancelComponent },
  { path: 'resume', title: 'Resume Subscription', component: ResumeComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubscriptionsRoutingModule { }
