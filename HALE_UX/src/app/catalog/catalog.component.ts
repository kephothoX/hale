import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';


import { MatSnackBar } from '@angular/material/snack-bar';

import { AppService } from '../services/app.service';
import { CatalogService } from './catalog.service';
import { Catalogue } from './catalog';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.scss'
})
export class CatalogComponent implements OnInit {
  Catalogue!: Catalogue[];
  LineItems!: Number;



  constructor (
    private _appService: AppService,
    private _catalogService: CatalogService,
    private _snackBar: MatSnackBar,
    private _formBuilder: FormBuilder,
  ) {}




  ngOnInit(): void {
    this._catalogService.listCatalog().subscribe((response: any) => {

      console.log(response.SQResponse.objects);

        if (response.SQResponse.objects.length < 1) {
          this._snackBar.open("No Catalogue Items Found.")
        } 

        this.Catalogue = response.SQResponse.objects;

        console.log(this.Catalogue);
      });

      this.getLineItems();
  }

  getLineItems() {
    let data = new Array();
    for (let i = 0; i < window.localStorage.length; i++) {
      let key = window.localStorage.key(i);
      if (key?.includes("LineItem")) {
        let entry: string | null = window.localStorage.getItem(key);
        if (entry) {
          data.push(entry);
        }
      }
    };

    this.LineItems = data.length;
    console.log(this.LineItems);

    return data;
  }
  

}

