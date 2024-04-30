import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AuthService } from '../../auth/auth.service';
import { SubscriptionsService } from '../subscriptions.service';

@Component({
  selector: 'app-cancel-subscription',
  templateUrl: './cancel.component.html',
  styleUrls: ['./cancel.component.scss']
})
export class CancelComponent implements OnInit {

  constructor (
    private _subscriptionsService: SubscriptionsService,
    private _authService: AuthService,
    private _router: Router,
    public _matSnackBar: MatSnackBar
  ) {}

  ngOnInit() {
    if(window.sessionStorage.getItem('active_subscription_id')) {
      this._subscriptionsService.cancelSubscription({ id: window.sessionStorage.getItem('active_subscription_id')}).subscribe((result: any) => {
        this._matSnackBar.open('Subscription Cancelled...', 'Dismiss');

        setTimeout(() => {
          this._router.navigate(['/home']);
        }, 1000);

      });
    } else {
      this._matSnackBar.open('You have no Avtive Subscriptions. Subscribe to Continue..', 'Dismiss');

      setTimeout(() => {
        this._authService.auditLog({
          message: `${window.sessionStorage.getItem('customer_email_address')} Cancelled Subscription`
        }).subscribe((result: any) => {
          this._matSnackBar.open(`${result.summary}`, 'Dismiss');
        });
        this._router.navigate(['/home']);
      }, 1000);

    }

  }

}
