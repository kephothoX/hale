import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AppService } from 'src/app/services/app.service';
//import { SquareService } from '../../services/square.service';
import { AuthService } from './../../auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Country } from 'src/app/interfaces/country';

import { AuthFlow } from '../auth-flow';

import { Payment } from '../../checkout/payment'
import { reference } from '@popperjs/core';
import * as moment from 'moment';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  HostedLoginPage: String = "https://pdn-2snolcdqeqwjygvwfl54i2wunbu5klxv.login.gcp.us.pangea.cloud/authorize?state=xxxxxxxxxxxxx"
  AuthFlow?: AuthFlow;
  SiteKey?: String;
  visibility: string = 'hidden';
  disable_next: boolean = true;
  duration: string = '2000';
  email_address: string = '';
  Countries?: Country[];
  Phone_Prefix?: string;

  constructor(
    private _formBuilder: FormBuilder,
    private _authService: AuthService,
    private _appService: AppService,
    private _router: Router,
    //private _squareService: SquareService,
    public _matSnackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this._appService.getCountryCodes().subscribe((result: any) => {
      this.Countries = result.Countries;
    });
  }

  newUserForm = this._formBuilder.group({
    given_name: ['', Validators.required],
    family_name: ['', Validators.required],
    email_address: ['', Validators.required],
    phone_number: ['', Validators.required],
    company_name: ['', Validators.required],
    birthday: ['', Validators.required],
    reference_id: [''],
    note: [''],


    address_line_1: ['', Validators.required],
    address_line_2: ['', Validators.required],
    locality: ['', Validators.required],
    administrative_district_level_1: ['', Validators.required],
    postal_code: ['', Validators.required],
    country: ['', Validators.required]

  });



  getEmailAddress(event: Event) {
    const email = (event.target as HTMLInputElement).value;
    this.email_address = email;
  }

  getCountryPrefix(prefix: string) {
    this.Phone_Prefix = prefix;
  }

  addBillingInformation = this._formBuilder.group({

  });

  ngOnSubmitSquareCustomer() {
    const newUser = this.newUserForm.value;

    const sQUserDataSet = {
      idempotency_key: self.crypto.randomUUID(),
      given_name: newUser.given_name,
      family_name: newUser.family_name,
      email_address: newUser.email_address,
      phone_number: `${this.Phone_Prefix}${newUser.phone_number}`,
      company_name: newUser.company_name,
      note: 'Hale Health Services',
      reference_id: 'Hale Health Service',
      birthday: `${moment(newUser.birthday).format('YYYY-MM-DD')}`,

      address: {
        address_line_1: newUser.address_line_1,
        address_line_2: newUser.address_line_2,
        locality: newUser.locality,
        administrative_district_level_1: newUser.administrative_district_level_1,
        postal_code: newUser.postal_code,
        country: newUser.country
      },
    };


    this._authService.newSquareCustomer(sQUserDataSet).subscribe((result: any) => {
      console.log(result)
      window.sessionStorage.setItem('SQUSer', `${JSON.stringify(result.SQResponse.customer)}`);

      window.sessionStorage.setItem('email_address', `${result.SQResponse.customer.email_address}`);
      window.sessionStorage.setItem('given_name', `${result.SQResponse.customer.given_name}`);
      window.sessionStorage.setItem('family_name', `${result.SQResponse.customer.family_name}`);
      window.sessionStorage.setItem('SQ_User_ID', `${result.SQResponse.customer.id}`);
      this._matSnackBar.open('Square  Customer Created Successfully', 'Dismiss');


      this._authService.getUser({ email: window.sessionStorage.getItem('email_address') }).subscribe((res: any) => {
        console.log(res);

        if (res.status == 'Success') {
          this._matSnackBar.open(`Welcome  ${res.result.profile.first_name}`, 'Dismiss');

          window.sessionStorage.setItem('email_address', `${res.result.email}`);
          window.sessionStorage.setItem('auth_id', `${res.result.id}`);
          window.sessionStorage.setItem('given_name', `${res.result.profile.first_name}`);
          window.sessionStorage.setItem('family_name', `${res.result.profile.last_name}`);

          setTimeout(() => {
            this._router.navigate(['/auth/signin']);

          });

        }

        if (res.status == 'InvalidUser') {
          this._authService.newUser({
            email: window.sessionStorage.getItem('email_address'),
            profile: {
              first_name: window.sessionStorage.getItem('given_name'),
              last_name: window.sessionStorage.getItem('family_name'),
              phone: window.sessionStorage.getItem('phone_number')
            }
          }).subscribe((response: any) => {
            console.log(response);
          });
        }
      });
    });


  }

  resetForm() {
    this.newUserForm.reset();
  }

  createPayment() {
    const payment: Payment = {
      location_id: window.sessionStorage.getItem('main_loc'),
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
    this.disable_next = false;
  }

}
