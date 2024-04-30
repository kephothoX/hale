import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { CatalogService } from '../../catalog/catalog.service';
import { AppService } from 'src/app/services/app.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from 'src/app/locations/location';
import { LocationsService } from 'src/app/locations/locations.service';

@Component({
  selector: 'app-new-catalog',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent {
  Locations: Location[] = [];
  BooleanValues: String[] = ['true', 'false'];
  CatalogItemVariations = new Array();
  panelOpenState = false;
  AIResponse!: String;
  CatalogItemImage!: {};
  formData = new FormData;
  CatalogItemID!: any;
  
  File: any;

  constructor (
    private _formBuilder: FormBuilder,
    private _catalogService: CatalogService,
    private _appService: AppService,
    private _locationsService: LocationsService,
    private _snackBar: MatSnackBar,
  ) {}


  ngOnInit(): void {
    this._locationsService.listLocations().subscribe((results: any) => {
      this.Locations = results.SQResponse.locations;
      console.log('Locations: ', this.Locations);
    });
  }


  newCatalogueItemForm = this._formBuilder.group({
    id: ['', Validators.required ],
    name: ['', Validators.required ],
    description: ['', Validators.required ],
    abbreviation: ['', Validators.required ],
    locations_ids: ['']
  });

  catalogueAttributesForm = this._formBuilder.group({
    product_name: [''],
    product_color: [''],
    product_size: [''],
    other_attributes: ['']
  });


   newCatalogueItemVariationsForm = this._formBuilder.group({
    id: ['', Validators.required ],
    name: ['', Validators.required ],
    amount: ['', Validators.required],   
  });

  getCatalogueItemId(event: Event){
    const objectId: String = (event.target as HTMLInputElement).value? (event.target as HTMLInputElement).value : '';
    
    this.CatalogItemID = objectId.trim();
  }


  submitNewCatalogueItem() {
    const data =  {
      idempotency_key: `${ window.crypto.randomUUID() }`.toLocaleUpperCase(),
      object: {
        type: 'ITEM',
        id:  `#${this.CatalogItemID}`,
        present_at_all_locations: Boolean(true),
        //present_at_location_ids: this.newCatalogueItemForm.value.locations_ids,
        is_deleted: Boolean(false),
        item_data: {
          description_html: this.newCatalogueItemForm.value.description,
          abbreviation: this.newCatalogueItemForm.value.abbreviation,
          available_electronically: Boolean(false),
          available_for_pickup: Boolean(false),
          available_online: Boolean(false),
          is_archived: Boolean(false),
          label_color: '245100',
          name: this.newCatalogueItemForm.value.name,
          product_type: 'APPOINTMENTS_SERVICE',
          variations: this.CatalogItemVariations
        },
        
      }
    };
    console.log(data);

    this._catalogService.addNewCatalog(data).subscribe((response: any) => {
      console.log(response);
      this._snackBar.open(`${ response }`,'Close');
      //window.location.reload(); 
    });
  }

  addNewCatalogueItemVariation() {

    const data = {
      id: `#${ this.newCatalogueItemVariationsForm.value.id }`.trim(),
      type: 'ITEM_VARIATION',
      item_variation_data: {
        //available_for_booking: Boolean(true),
        //item_id: `#${this.CatalogItemID}`,
        name: this.newCatalogueItemVariationsForm.value.name,
        pricing_type: 'FIXED_PRICING',
        stockable: Boolean(true),
       // service_duration: 180000,
        price_money: {
          amount: this.newCatalogueItemVariationsForm.value.amount,
          currency: 'USD'
        }
      }
    }; 


     console.log(data);

     this.CatalogItemVariations.push(data);

     console.log(this.CatalogItemVariations);
  }

  removeCatalogItemVariation() {
    this.CatalogItemVariations.pop();

    console.log(this.CatalogItemVariations);
  }

  


  onFileChange(event: any) {
    if (event.target.files && event.target.files.length) {

      const file  = event.target.files[0];
      this.formData.append('attachment', file);

      console.log(file);
      console.log(this.formData.get('attachment'));
    }  
    
  }

  onSubmit () {}


  resetNewCatalogueItemForm (): void {
    this.newCatalogueItemForm.reset()
  }


  resetNewCatalogueItemVariationsForm (): void {
    this.newCatalogueItemVariationsForm.reset();
  }

  resetCatalogueAttriburesForm() {
    this.catalogueAttributesForm.reset();
  }

  generateAIDescription() {
    const prod_attrs = {
      product_name: this.catalogueAttributesForm.value.product_name,
      product_color: this.catalogueAttributesForm.value.product_color,
      product_size: this.catalogueAttributesForm.value.product_size,
    }
  }

}

