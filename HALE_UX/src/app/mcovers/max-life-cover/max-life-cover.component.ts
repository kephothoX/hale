import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { CatalogService } from 'src/app/catalog/catalog.service';
import { SubscriptionsService } from '../../subscriptions/subscriptions.service';
import { AppService } from 'src/app/services/app.service';
import { AuthService } from '../../auth/auth.service';


@Component({
  selector: 'app-max-life-cover',
  templateUrl: './max-life-cover.component.html',
  styleUrls: ['./max-life-cover.component.scss']
})
export class MaxLifeCoverComponent implements OnInit {
  weeklyAmount?: number;
  monthlyAmount?: number;
  annualAmount?: number;

  isLoggedIn: Boolean = window.sessionStorage.getItem('auth_login_status') ? true : false;

  constructor(
    private _catalogService: CatalogService,
    private _authService: AuthService,
    private _squareService: SubscriptionsService,
    private _appService: AppService,
    private _router: Router,
    public _matSnackBar: MatSnackBar,
  ) {  }


  ngOnInit() {
    this.getWeeklyMLCSubscriptionAmount();
    this.getMonthlylyMLCSubscriptionAmount();
    this.getAnnualMLCSubscriptionAmount();

  }


  getWeeklyMLCSubscriptionAmount() {
    this._catalogService.getCatalogWithID({ id: 'ITAJTCSYUMP2NBBAOZWEISRR' }).subscribe((result: any) => {
      this.weeklyAmount = result.object.subscription_plan_data.phases[0].recurring_price_money.amount;

    });
  }

  getMonthlylyMLCSubscriptionAmount() {
    this._catalogService.getCatalogWithID({ id: 'GYW4I57XBBTNM5FSV5JCJEH5' }).subscribe((result: any) => {
      this.monthlyAmount = result.object.subscription_plan_data.phases[0].recurring_price_money.amount;

    });
  }

  getAnnualMLCSubscriptionAmount() {
    this._catalogService.getCatalogWithID({ id: 'OI3G6ID2GWQ2RF6OBMMH6QU2' }).subscribe((result: any) => {
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
          "plan_id": "ITAJTCSYUMP2NBBAOZWEISRR",
          "customer_id": window.sessionStorage.getItem('customer_id')

        }
        this._squareService.newSubscriptionPlan(dataSet).subscribe((res: any) => {
          this._matSnackBar.open('Subscription Successfull.', 'Dismiss');

          setTimeout(() => {
            this._authService.auditLog({
              message: `${window.sessionStorage.getItem('customer_email_address')} Subscribed to Max Life Weekly Subscription`
            }).subscribe((result: any) => {
              this._matSnackBar.open(`${result.summary}`, 'Dismiss');
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
          "plan_id": "GYW4I57XBBTNM5FSV5JCJEH5",
          "customer_id": window.sessionStorage.getItem('customer_id')

        }
        this._squareService.newSubscriptionPlan(dataSet).subscribe((res: any) => {
          this._matSnackBar.open('Subscription Successfull.', 'Dismiss');

          setTimeout(() => {
            this._authService.auditLog({
              message: `${window.sessionStorage.getItem('customer_email_address')} Subscribed to Max Life Monthly Subscription`
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
          "plan_id": "OI3G6ID2GWQ2RF6OBMMH6QU2",
          "customer_id": window.sessionStorage.getItem('customer_id')

        }
        this._squareService.newSubscriptionPlan(dataSet).subscribe((res: any) => {
          this._matSnackBar.open('Subscription Successfull.', 'Dismiss');

          setTimeout(() => {
            this._authService.auditLog({
              message: `${window.sessionStorage.getItem('customer_email_address')} Subscribed to Max Life Annual Subscription`
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
