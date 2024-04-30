import { Component, OnInit } from '@angular/core';
import { SubscriptionsService } from './subscriptions.service'
import { Router } from '@angular/router';

import { MatSnackBar } from '@angular/material/snack-bar';
import { Invoice } from '../checkout/invoice';

import { LocationsService } from '../locations/locations.service';


@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.scss']
})
export class SubscriptionsComponent implements OnInit {
  invoices: Invoice[] = [];
  locationIds = new Array();

  displayedColumns: string[] = ['invoice_number', 'title', 'created_at', 'subscription_amount', 'amount_paid', 'due_date', 'status', 'public_url']

  constructor(
    private _subscriptionsService: SubscriptionsService,
    private _locationsService: LocationsService,
    private _router: Router,
    public _matSnackBar: MatSnackBar,
  ) {
    window.sessionStorage.setItem('active_route', `${this._router.routerState.snapshot.url}`);
  }


  ngOnInit() {
    this._locationsService.listLocations().subscribe((response: any) => {
      for (let entry of response.SQResponse.locations) {
        this.locationIds.push(entry.id);
      }

      if (this.locationIds.length > 0) {
        const qs = {
          query: {
            filter: {
              customer_ids: [
                `${window.sessionStorage.getItem('SQ_User_ID')}`
              ],
              location_ids: this.locationIds
            }
          }
        };

        console.log(qs);

        this._subscriptionsService.getSubscriptions(qs).subscribe((resp: any) => {
          this.invoices = resp.SQResponse.invoices;

          console.log(resp);

          window.sessionStorage.setItem('active_subscription_id', `${resp.SQResponse.invoices[0].subscription_id}`);

        });

      }
    })


  }



}
