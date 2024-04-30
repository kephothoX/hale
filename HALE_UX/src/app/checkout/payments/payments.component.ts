import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { MatSnackBar } from '@angular/material/snack-bar';

import { Location } from 'src/app/locations/location';
import { LocationsService } from 'src/app/locations/locations.service';
import { Payment } from '../payment';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit {
  Locations?: Location[];

    constructor (
    private _locationsService: LocationsService,
    private _formBuilder: FormBuilder,
    public _matSnackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this._locationsService.listLocations().subscribe((results: any) => {
      this.Locations = results.SQResponse.locations;
      console.log('Locations: ', this.Locations);
    });
  }

  setLocationForm = this._formBuilder.group({
    location: ['', Validators.required ]
  });


  ngOnSubmit(): void{
    window.localStorage.setItem('Active_Loc', `${ this.setLocationForm.value.location }`);
  }



  createPayment() {
    const payment: Payment = {
      location_id: window.localStorage.getItem('Active_Loc'),
      source_id: window.sessionStorage.getItem('token'),
      verification_token: window.sessionStorage.getItem('verificationToken'),
      idempotency_key: window.crypto.randomUUID(),
      autocomplete: true,
      note: "Customer Card Verification",
      customer_id: "W92WH6P11H4Z77CTET0RNTGFW8",
      amount_money: {
        amount: 1,
        currency: "USD"
      },
    };
    /*this._squareService.newPayment(payment).subscribe((result: any) => {
      console.log(result);
    });*/
  }


  getPayment() {
    //this.disable_next = false;
  }

  setAmount(event: Event) {
    const amount = (event.target as HTMLInputElement).value;
    window.localStorage.setItem('TotalCheckOutAmount', amount);

    console.log(amount);

  }
  
}

