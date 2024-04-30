import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CatalogService } from 'src/app/catalog/catalog.service';
import { SubscriptionsService } from '../../subscriptions/subscriptions.service';
import { AppService } from 'src/app/services/app.service';

import { AuthService } from '../../auth/auth.service';



@Component({
  selector: 'app-life-cover',
  templateUrl: './life-cover.component.html',
  styleUrls: ['./life-cover.component.scss']
})
export class LifeCoverComponent implements OnInit {
  weeklyAmount?: number;
  monthlyAmount?: number;
  annualAmount?: number;

  isLoggedIn: Boolean  = window.sessionStorage.getItem('auth_login_status')? true : false;

  constructor(
    private _catalogService: CatalogService,
    private _authService: AuthService,
    private _subscriptionsService: SubscriptionsService,
    private _appService: AppService,
    private _router: Router,
    public _matSnackBar: MatSnackBar,
  ) {  }


  ngOnInit() {
   this.getWeeklyLCSubscriptionAmount();
   this.getMonthlylyLCSubscriptionAmount();
   this.getAnnualLCSubscriptionAmount();

  }

  getWeeklyLCSubscriptionAmount() {
    this._catalogService.getCatalogWithID({id: 'AEBMKJ7JB2M5WEUDSLD5ZUAO'}).subscribe((result: any) => {
      this.weeklyAmount = result.object.subscription_plan_data.phases[0].recurring_price_money.amount;

    });
  }

  getMonthlylyLCSubscriptionAmount() {
    this._catalogService.getCatalogWithID({id: 'AE5AMW7LA7OVJBS2K2KNDOVC'}).subscribe((result: any) => {
      this.monthlyAmount = result.object.subscription_plan_data.phases[0].recurring_price_money.amount;

    });
  }

  getAnnualLCSubscriptionAmount() {
    this._catalogService.getCatalogWithID({id: '244VF2OQ5L55AXZMIJH2NGGP'}).subscribe((result: any) => {
      this.annualAmount = result.object.subscription_plan_data.phases[0].recurring_price_money.amount;

    });
  }


  subscribeWeekly() {
    if (window.sessionStorage.getItem('active_subscription_id')) {
      this._matSnackBar.open('Already Have An Active Subscription.', 'Dismiss');
      setTimeout(() => {
        this._router.navigate(['/subscriptions/my-invoices']);
      });
    } else {
      this._appService.listMerchants().subscribe((result: any) => {
        const dataSet = {
          "idempotency_key": self.crypto.randomUUID(),
          "location_id": result.merchant[0].main_location_id,
          "plan_id": "AEBMKJ7JB2M5WEUDSLD5ZUAO",
          "customer_id": window.sessionStorage.getItem('customer_id')

        }
        this._subscriptionsService.newSubscriptionPlan(dataSet).subscribe((res: any) => {
          this._matSnackBar.open('Subscription Successfull.', 'Dismiss');

          setTimeout(() => {
            this._authService.auditLog({
              message: `${ window.sessionStorage.getItem('customer_email_address')} Subscribed to LC Weekly Subscription`
            }).subscribe((result: any) => {
              this._matSnackBar.open(`${ result.summary }`, 'Dismiss');
            });

            this._router.navigate(['/subscriptions/my-invoices']);
          }, 1000);
        });
      });
    }

  }

  subscribeMonthly() {
    if (window.sessionStorage.getItem('active_subscription_id')) {
      this._matSnackBar.open('Already Have An Active Subscription.', 'Dismiss');
      setTimeout(() => {
        this._router.navigate(['/subscriptions/my-invoices']);
      });
    } else {
      this._appService.listMerchants().subscribe((result: any) => {
        const dataSet = {
          "idempotency_key": self.crypto.randomUUID(),
          "location_id": result.merchant[0].main_location_id,
          "plan_id": "AE5AMW7LA7OVJBS2K2KNDOVC",
          "customer_id": window.sessionStorage.getItem('customer_id')

        }
        this._subscriptionsService.newSubscriptionPlan(dataSet).subscribe((res: any) => {
          this._matSnackBar.open('Subscription Successfull.', 'Dismiss');

          setTimeout(() => {
            this._authService.auditLog({
              message: `${ window.sessionStorage.getItem('customer_email_address')} Subscribed to LC Monthly Subscription`
            }).subscribe((result: any) => {
              this._matSnackBar.open(`${ result.summary }`, 'Dismiss');
            });

            this._router.navigate(['/subscriptions/my-invoices']);
          }, 1000);
        });
      });
    }
  }


  subscribeAnnually() {
    if (window.sessionStorage.getItem('active_subscription_id')) {
      this._matSnackBar.open('Already Have An Active Subscription.', 'Dismiss');
      setTimeout(() => {
        this._router.navigate(['/subscriptions/my-invoices']);
      });
    } else {
      this._appService.listMerchants().subscribe((result: any) => {
        const dataSet = {
          "idempotency_key": self.crypto.randomUUID(),
          "location_id": result.merchant[0].main_location_id,
          "plan_id": "244VF2OQ5L55AXZMIJH2NGGP",
          "customer_id": window.sessionStorage.getItem('customer_id')

        }
        this._subscriptionsService.newSubscriptionPlan(dataSet).subscribe((res: any) => {
          this._matSnackBar.open('Subscription Successfull.', 'Dismiss');

          setTimeout(() => {
            this._authService.auditLog({
              message: `${ window.sessionStorage.getItem('customer_email_address')} Subscribed to LC Annual Subscription`
            }).subscribe((result: any) => {
              this._matSnackBar.open(`${ result.summary }`, 'Dismiss');
            });

            this._router.navigate(['/subscriptions/my-invoices']);
          }, 1000);
        });
      });
    }
  }
}
