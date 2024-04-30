import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { CurrencyService } from '../../../checkout/currency.service';
import { CadenceService } from '../../../subscriptions/cadence.service';
import { CatalogService } from '../../../catalog/catalog.service';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-new-subscription',
  templateUrl: './new-subscription.component.html',
  styleUrl: './new-subscription.component.scss'
})
export class NewSubscriptionComponent {
  isLinear: boolean = true;
  SearchResults: any;

  Type: any[] = [
    {
      name: 'Static',
      value: 'STATIC'
    },
    {
      name: 'Relative',
      value: 'RELATIVE'
    }
  ]

  constructor(
    private _formBuilder: FormBuilder,
    private _currencyService: CurrencyService,
    private _catalogService: CatalogService,
    private _cadenceService: CadenceService,
    public _matDialog: MatDialog,
    public _matSnackBar: MatSnackBar,
  ) {}

  Currency = this._currencyService.Currency;

  Cadence = this._cadenceService.Cadence;

  newSubscriptionPlanVariationForm = this._formBuilder.group({
    id: ['', Validators.required],
    name: ['', Validators.required ],
    cadence: ['', Validators.required],
    currency: ['', Validators.required],
    amount: ['', Validators.required],
    ordinal: ['', Validators.required ],
    type: ['', Validators.required]
  });

  newSubscriptionPlanForm = this._formBuilder.group({
    id: ['', Validators.required],
    name: ['', Validators.required ],
    version: ['', Validators.required]
  });



  onSubmitSubscriptionPlan () {
    const formValues = this.newSubscriptionPlanForm.value;

    const dataset = {
      idempotency_key: self.crypto.randomUUID(),
      object: {
        type: 'SUBSCRIPTION_PLAN',
        id: `${ formValues.id }`,
        present_at_all_locations: true,
        subscription_plan_data: {
          name: `${ formValues.name }`,
        }
      }
    };

    this._catalogService.addNewCatalog(dataset).subscribe((response: any) => {
      this._matSnackBar.open('New Subscription Plan Created Successfully', 'Dismiss');
      
      console.log(response);

      window.localStorage.setItem('SubscriptionPlanId', `${ response.SQResponse.catalog_object.id }`)
    });
  }

  findSimilarPackages(): void {
    this._catalogService.searchCatalog({
      object_types: [
        'SUBSCRIPTION_PLAN'
      ],
      include_category_path_to_root: false,
      query: {
        text_query: {
          keywords: [
            this.newSubscriptionPlanForm.value.name
          ]
        }
      },
      "include_related_objects": true
    
    }).subscribe((response: any) => {
      this.SearchResults = JSON.stringify(response);
    });
  }


  onSubmitSubscriptionPlanVariation () {
    const formValues = this.newSubscriptionPlanVariationForm.value;

    const dataSet = {
      idempotency_key: self.crypto.randomUUID(),
      object: {
        type: 'SUBSCRIPTION_PLAN_VARIATION',
        id: `${ formValues.id }`,
        present_at_all_locations: false,
        present_at_location_ids: new Array(window.localStorage.getItem('Active_Loc')),
        subscription_plan_variation_data: {
          name: formValues.name,
          phases: [
            {
              cadence: formValues.cadence,
              pricing: {
                price_money: {
                  amount: formValues.amount,
                  currency: 'USD'
                },
                type: formValues.type
              },            
              ordinal: formValues.ordinal
            }
          ],
          subscription_plan_id: window.localStorage.getItem('SubscriptionPlanId')
        }
      }
    };


    this._catalogService.addNewCatalog(JSON.stringify(dataSet)).subscribe((response: any) => {
      this._matSnackBar.open('New Subscription Plan Created Successfully', 'Dismiss');

      console.log(response);
    });
  }

  resetForm() {
    this.newSubscriptionPlanForm.reset();
    window.location.reload();
  }
}

