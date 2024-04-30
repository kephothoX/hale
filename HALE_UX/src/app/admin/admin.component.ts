import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Location } from '../locations/location';
import { LocationsService } from '../locations/locations.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent implements OnInit{
  Locations?: Location[];

  constructor (
    private _locationsService: LocationsService,
    private _formBuilder: FormBuilder,
    public _matDialog: MatDialog,
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


}
