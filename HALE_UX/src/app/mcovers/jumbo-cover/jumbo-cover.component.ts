import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { CatalogService } from 'src/app/catalog/catalog.service';
import { SubscriptionsService } from '../../subscriptions/subscriptions.service';
import { AppService } from 'src/app/services/app.service';

import { AuthService } from '../../auth/auth.service';


@Component({
  selector: 'app-jumbo-cover',
  templateUrl: './jumbo-cover.component.html',
  styleUrls: ['./jumbo-cover.component.scss']
})
export class JumboCoverComponent implements OnInit{
  weeklyAmount?: number;
  monthlyAmount?: number;
  annualAmount?: number;

  isLoggedIn: Boolean  = window.sessionStorage.getItem('auth_login_status')? true : false;

  constructor(
    private _catalogService: CatalogService,
    private _subscriptionsService: SubscriptionsService,
    private _appService: AppService,
    private _authService: AuthService,
    private _router: Router,
    public _matSnackBar: MatSnackBar,
  ) {  }


  ngOnInit() {
   this.getWeeklyLCSubscriptionAmount();
   this.getMonthlylyLCSubscriptionAmount();
   this.getAnnualLCSubscriptionAmount();

  }


  getWeeklyLCSubscriptionAmount() {
    this._catalogService.getCatalogWithID({id: 'FQNB5FFD6H2JG3IT5TF5A5WS'}).subscribe((result: any) => {
      this.weeklyAmount = result.object.subscription_plan_data.phases[0].recurring_price_money.amount;

    });
  }

  getMonthlylyLCSubscriptionAmount() {
    this._catalogService.getCatalogWithID({id: 'Z6LJFR6T3TSWU4KHVHWAUBIX'}).subscribe((result: any) => {
      this.monthlyAmount = result.object.subscription_plan_data.phases[0].recurring_price_money.amount;

    });
  }

  getAnnualLCSubscriptionAmount() {
    this._catalogService.getCatalogWithID({id: 'P2BDA6OMZX5TXNYUGPHK5LYR'}).subscribe((result: any) => {
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
          "plan_id": "FQNB5FFD6H2JG3IT5TF5A5WS",
          "customer_id": window.sessionStorage.getItem('customer_id')

        }
        this._subscriptionsService.newSubscriptionPlan(dataSet).subscribe((res: any) => {
          this._matSnackBar.open('Subscription Successfull.', 'Dismiss');

          setTimeout(() => {
           this._authService.auditLog({
              message: `${ window.sessionStorage.getItem('customer_email_address')} Subscribed to Jumbo Weekly Subscription`
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
        this._authService.auditLog({
          message: `${window.sessionStorage.getItem('customer_email_address')} Subscribed to Jumbo Monthly Subscription`
        }).subscribe((result: any) => {
          this._matSnackBar.open(`${result.summary}`, 'Dismiss');
        });

        this._router.navigate(['/subscriptions/my-invoices']);
      });
    } else {
      this._appService.listMerchants().subscribe((result: any) => {
        const dataSet = {
          "idempotency_key": self.crypto.randomUUID(),
          "location_id": result.merchant[0].main_location_id,
          "plan_id": "Z6LJFR6T3TSWU4KHVHWAUBIX",
          "customer_id": window.sessionStorage.getItem('customer_id')

        }
        this._subscriptionsService.newSubscriptionPlan(dataSet).subscribe((res: any) => {
          this._matSnackBar.open('Subscription Successfull.', 'Dismiss');

          setTimeout(() => {
            this._authService.auditLog({
              message: `${window.sessionStorage.getItem('customer_email_address')} Subscribed to Jumbo Annual Subscription`
            }).subscribe((result: any) => {
              this._matSnackBar.open(`${result.summary}`, 'Dismiss');
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
          "plan_id": "P2BDA6OMZX5TXNYUGPHK5LYR",
          "customer_id": window.sessionStorage.getItem('customer_id')

        }
        this._subscriptionsService.newSubscriptionPlan(dataSet).subscribe((res: any) => {
          this._matSnackBar.open('Subscription Successfull.', 'Dismiss');

          setTimeout(() => {
            this._authService.auditLog({
              message: `${window.sessionStorage.getItem('customer_email_address')} Subscribed to Jumbo Annual Subscription`
            }).subscribe((result: any) => {
              this._matSnackBar.open(`${result.summary}`, 'Dismiss');
            });

            this._router.navigate(['/subscriptions/my-invoices']);
          }, 1000);

        });
      });
    }

  }


}

