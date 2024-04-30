import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { AppService } from 'src/app/services/app.service';
import { VendorsService } from '../vendors.service';
import { Country } from 'src/app/interfaces/country';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrl: './new.component.scss'
})
export class NewComponent implements OnInit {
  Countries?: Country[];
  Phone_Prefix?: string;
  ActiveSession: any;
  ActiveSessionEmail: any;
  ActiveSessionFirstName: any;
  ActiveSessionLastName: any;

  constructor (
    private _appService: AppService,
    private _formBuilder: FormBuilder,
    private _vendorsService: VendorsService,
    public _matSnackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this._appService.getCountryCodes().subscribe((result: any) => {
      this.Countries = result.Countries;
    });

    let ActiveSessions: any = window.sessionStorage.getItem('ActiveSessions');
    console.log(JSON.parse(ActiveSessions));

    if (ActiveSessions != undefined ) {
      ActiveSessions = JSON.parse(ActiveSessions)

      if(ActiveSessions.length > 1) { 
        this.ActiveSession = ActiveSessions[ActiveSessions.length-1];
        console.log(this.ActiveSession);

        this.ActiveSessionEmail = this.ActiveSession.email;
        this.ActiveSessionFirstName = this.ActiveSession.profile.first_name;
        this.ActiveSessionLastName = this.ActiveSession.profile.last_name;

      } else {
        this.ActiveSession = ActiveSessions[0];
        console.log(this.ActiveSession);

        this.ActiveSessionEmail = this.ActiveSession.email;
        this.ActiveSessionFirstName = this.ActiveSession.profile.first_name;
        this.ActiveSessionLastName = this.ActiveSession.profile.last_name;

        console.log(this.ActiveSessionEmail);
        console.log(this.ActiveSessionFirstName);
      }
      
    }
  }


   newVendorForm = this._formBuilder.group({
    phone_number: ['', Validators.required],
    note: ['', Validators.required],
    address_line_1: ['', Validators.required],
    locality: ['', Validators.required],
    city: ['', Validators.required],
    postal_code: ['', Validators.required],
    country: ['', Validators.required]

  });

  ngOnSubmitVendor(): void {
    this._vendorsService.newVendor({
      vendor: {
      address: {
        address_line_1: this.newVendorForm.value.address_line_1,
        administrative_district_level_1: this.newVendorForm.value.city,
        country: this.newVendorForm.value.country,
        first_name: this.ActiveSessionFirstName,
        last_name: this.ActiveSessionLastName,
        locality: this.newVendorForm.value.locality,
        postal_code: this.newVendorForm.value.postal_code
      },
      name: `${ this.ActiveSessionFirstName } ${ this.ActiveSessionLastName }`,
      note: this.newVendorForm.value.note,
      status: 'INACTIVE',
      contacts: [
        {
          ordinal: 1,
          email_address: this.ActiveSessionEmail,
          name: `${ this.ActiveSessionFirstName } ${ this.ActiveSessionLastName }`,
          phone_number: this.newVendorForm.value.phone_number,
          removed: true
        }
      ]
    },
    idempotency_key: window.crypto.randomUUID()
    }).subscribe((response: any) => {
      console.log(response)
    })
  }

   getCountryPrefix(prefix: string) {
    this.Phone_Prefix = prefix;
  }

  resetForm(): void {
    this.newVendorForm.reset();
  }

}

/*

{
    
  }
*/
