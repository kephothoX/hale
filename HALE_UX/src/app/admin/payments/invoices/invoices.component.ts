import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { CheckoutService } from '../../../checkout/checkout.service';
import { CurrencyService } from '../../../checkout/currency.service';
import { AuthService } from '../../../auth/auth.service';
import { AppService } from 'src/app/services/app.service';
import { LocationsService } from 'src/app/locations/locations.service';
import { Invoice } from '../../../checkout/invoice';
import { Location } from 'src/app/interfaces/location';

import * as moment from 'moment';

import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-generate-invoice',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.scss']
})
export class InvoicesComponent implements OnInit{
  duration: string = '2000';
  lineItemsCount: any[] = new Array('newlineItem',);
  lineItems: any[] = new Array();

  locations: Location[]  = [];

  locationID?: string;
  customerID?: string;
  orderID?: string;

  Currency = this._currencyService.Currency;

  InvoiceTypes: string[] = [ 'BALANCE', 'DEPOSIT', 'INSTALLMENT'];

  orderBackButton: boolean = false;
  invoiceBackButton: boolean = false;


  Invoice?: Invoice;

 ngOnInit() {
   this._locationsService.listLocations().subscribe((result: any) => {
     this.locations = result.locations;
   });
 }


  constructor(
    private _formBuilder: FormBuilder,
    private _checkoutService: CheckoutService,
    private _currencyService: CurrencyService,
    private _authService: AuthService,
    private _appService: AppService,
    private _locationsService: LocationsService,
    private _matSnackBar: MatSnackBar
  ) { }

  newOrderForm =  this._formBuilder.group({
    name: ['', Validators.required],
    customer_id: ['', Validators.required ],
    quantity: ['', Validators.required],
    remarks: ['', Validators.required],
    amount: ['', Validators.required],
    currency: ['', Validators.required]
  });

  newInvoiceForm =  this._formBuilder.group({
    title: ['', Validators.required],
    date: ['', Validators.required],
    type: ['', Validators.required],
    balance: [''],
    remarks: ['', Validators.required],
    interval: ['', Validators.required],
    due_date: ['', Validators.required],

  });


  ngOnSubmitOrder() {
    this.orderBackButton = true;

    this.lineItemsCount.pop();
    this.addNewLineItem();

    this._appService.listMerchants().subscribe((res: any) => {
      const formValues = this.newOrderForm.value;

      const dataSet = {
        "idempotency_key": self.crypto.randomUUID(),
        "order": {
          "location_id": window.localStorage.getItem('Active_Loc'),
          "customer_id": formValues.customer_id,
          "line_items": this.lineItems
        }
      }

      console.log(dataSet);

      this._checkoutService.newOrder(dataSet).subscribe((result: any) => {
        this.locationID = result.order.location_id;
        this.orderID = result.order.id;
        this.customerID = result.order.customer_id;

        this._matSnackBar.open('New Order Created Successfully. Contunue to Create An Invoice', 'Dismiss');
      });

    });

  }

  ngOnSubmitInvoice() {
    this.invoiceBackButton = true;

    const formValues = this.newInvoiceForm.value;

    const dataSet = {
      "idempotency_key": self.crypto.randomUUID(),
      "invoice": {
        "accepted_payment_methods": {
          "bank_account": false,
          "buy_now_pay_later": true,
          "card": false,
          "checkout_gift_card": false
        },
        "delivery_method": "EMAIL",
        "location_id": this.locationID,
        "sale_or_service_date":  this.formatDate(formValues.date),
        "title": formValues.title,
        "primary_recipient": {
          "customer_id": this.customerID
        },
        "payment_requests": [
          {
            "request_type": formValues.type,
            "tipping_enabled": false,
            "due_date": this.formatDate(formValues.due_date),
            "automatic_payment_source": "NONE",
            "reminders": [
              {
                "relative_scheduled_days": formValues.interval,
                "message": formValues.remarks
              }
            ]
          }
        ],
        "order_id": this.orderID,
        "scheduled_at": new Date().toISOString()
      }
    }

    this._checkoutService.generateNewInvoice(dataSet).subscribe((result: any) => {
      this._matSnackBar.open('New Invoice Generated and will be sent to Recipient.', 'Dismiss');

      this.Invoice = result.invoice;

      setTimeout(() => {
        this._authService.auditLog({
          message: `${window.sessionStorage.getItem('email_address')} Just Sent You An Invoice`
        }).subscribe((result: any) => {
          this._matSnackBar.open(`${result.summary}`, 'Dismiss');
        });
      });
    });
  }

  addNewLineItem() {
    this.lineItemsCount.push('newLineItem');

   const formValues = this.newOrderForm.value;

    const line_items = {
      "base_price_money": {
        "amount": formValues.amount,
        "currency": formValues.currency
      },
      "quantity": formValues.quantity?.toString(),
      "name": formValues.name,
      "note": formValues.remarks
    }

    this.lineItems.push(line_items);


  }

  formatDate(date: any) {
    return moment(date).format('YYYY-MM-DD');
  }



}
