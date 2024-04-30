import { Component, OnInit } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';
import { SubscriptionsService } from '../subscriptions/subscriptions.service';
import { CatalogService } from '../catalog/catalog.service';
import { SubscriptionPlanData } from '../subscriptions/subscriptions';

@Component({
  selector: 'app-mcovers',
  templateUrl: './mcovers.component.html',
  styleUrl: './mcovers.component.scss'
})
export class McoversComponent implements OnInit{
  SubscriptionPlans?: SubscriptionPlanData[];

  constructor(
    private _catalogService: CatalogService,
    private _subscriptionsService: SubscriptionsService,
    public _matSnackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
      this._catalogService.searchCatalog({
        object_types: ['SUBSCRIPTION_PLAN' ],
        include_category_path_to_root: false,
        query: {
          text_query: {
            keywords: [ 'Life Cover', 'Health Cover', 'Medical Cover' ]
          }
        },
        include_related_objects: true
      }).subscribe((response: any) => {
        console.log(response);
        this.SubscriptionPlans = response.SQResponse.objects;

        console.log(this.SubscriptionPlans)
      })
  }

  activateSubscription(subscription_id: String): void {
    console.log(subscription_id);

    const dataSet = {
      idempotency_key: window.crypto.randomUUID(),
      location_id: window.sessionStorage.getItem('SQ_Main_Loc'),
      plan_id: subscription_id,
      customer_id: window.sessionStorage.getItem('SQ_User_ID')

    }
    this._subscriptionsService.newSubscriptionPlan(dataSet).subscribe((response: any) => {
      console.log(response);
      this._matSnackBar.open('Subscription Successfull.', 'Dismiss');

      // this._router.navigate(['/subscriptions/my-invoices']);

    });
  }

}
