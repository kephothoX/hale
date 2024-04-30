import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';


import { Loader } from '@googlemaps/js-api-loader';

import { LocationsService } from '../../../locations/locations.service';
import { AppService } from 'src/app/services/app.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Country } from 'src/app/interfaces/country';
import { Timezone } from 'src/app/interfaces/timezone';
import { Langcode } from 'src/app/interfaces/langcode';
import { MCCCodes } from 'src/app/interfaces/mcc-codes';

import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-new-location',
  templateUrl: './new-location.component.html',
  styleUrls: ['./new-location.component.scss']
})
export class NewLocationComponent implements OnInit {
  visibility: string = 'hidden';
  isOpen: boolean = false;
  Countries?: Country[];
  Timezones?: Timezone[];
  Lang_Codes?: Langcode[];
  Phone_Prefix?: String;
  MCC_Codes?: MCCCodes[];

  scheduleCount = new Array(1,);

  schedule  = new Array();

  latitude?: number;
  longitude?: number;

  daysOfTheWeek: string[] = [ "SUN", "MON", "TUE", "WED", "THU",  "FRI",  "SAT" ];

  AddressType: string[] = ['PHYSICAL', 'MOBILE'];

  API_KEY: string = '*****';

  MapChoice: string = '';

  loader: any = new Loader({
    'apiKey': this.API_KEY,
    'version': 'weekly',
    'libraries': [ 'geometry', 'places']
  });

  constructor(
    private _formBuilder: FormBuilder,
    private _locationsService: LocationsService,
    private _appService: AppService,
    public _matSnackBar: MatSnackBar,

  ) { }

  ngOnInit(): void {
    this._appService.getCountryCodes().subscribe((result: any) => {
      this.Countries = result.Countries;
    });

    this._appService.getTimezones().subscribe((result: any) => {
      this.Timezones = result.zones;
    });

    this._appService.getLanguageCodes().subscribe((result: any) => {
      this.Lang_Codes = result;
    });

    this._appService.getMCCCodes().subscribe((result: any) => {
      this.MCC_Codes = result.MCC_Codes;
    });
  }

  getCountryPrefix(prefix: string) {
    this.Phone_Prefix = prefix;
  }

  newLocationForm = this._formBuilder.group({
    name: ['', Validators.required],
    business_name: ['', Validators.required],
    first_name: ['', Validators.required],
    last_name: ['', Validators.required],
    phone_number: ['', Validators.required],
    business_email: ['', Validators.required],
    description: ['', Validators.required],
    address_line_1: ['', Validators.required],
    address_line_2: ['', Validators.required],
    locality: ['', Validators.required],
    administrative_district_level_1: ['', Validators.required],
    postal_code: ['', Validators.required],
    twitter_username: ['', Validators.required],
    instagram_username: ['', Validators.required],
    facebook_url: ['', Validators.required],
    website_url: ['', Validators.required],
    type: ['', Validators.required],
    latitude: ['', Validators.required],
    longitude: ['', Validators.required],
    mcc: ['', Validators.required],
    language_code: ['', Validators.required],
    timezone: ['', Validators.required],
    country: ['', Validators.required],
    sublocality: ['', Validators.required]
  });

  businessHours = this._formBuilder.group({
    day_of_week: ['', Validators.required],
    start_local_time: ['', Validators.required],
    end_local_time: ['', Validators.required],
  });

  onSubmit() {
    const formValues = this.newLocationForm.value;
    const periods = new Array();

    for(const value of this.schedule) {
      periods.push(JSON.parse(value))
    }

    console.log(periods)

    const dataSet = {
      'location': {
        name: formValues.name,
        description: formValues.description,
        business_name: formValues.business_name,
        business_email: formValues.business_email,
        phone_number: `${ this.Phone_Prefix } ${ formValues.phone_number }`,
        address: {
          address_line_1: formValues.address_line_1,
          address_line_2: formValues.address_line_2,
          locality: formValues.locality,
          administrative_district_level_1: formValues.administrative_district_level_1,
          postal_code: formValues.postal_code,
          sublocality: formValues.sublocality,
          first_name: formValues.first_name,
          last_name: formValues.last_name
        },
        twitter_username: formValues.twitter_username,
        instagram_username: formValues.instagram_username,
        facebook_url: formValues.facebook_url,
        website_url: formValues.website_url,
        type: formValues.type,
        timezone: formValues.timezone,
        mcc: formValues.mcc,
        language_code: formValues.language_code,
        business_hours: {
          periods: periods,
        },
        coordinates: {
          latitude: Number(`${ formValues.latitude }`),
          longitude: Number(`${ formValues.longitude }`)
        }
      }
    };

    console.log(dataSet);

    this._locationsService.addNewLocation(dataSet).subscribe((response: any) => {
      this._matSnackBar.open('Location Created Successfully', 'Dismiss');

      console.log(response);

      this._locationsService.saveLocation({
        business_email: response.SQResponse.location.business_email,
        location_id: response.SQResponse.location.id
      }).subscribe((response: any) => {
        this._matSnackBar.open(`${ response }`, 'Dismiss');
      })

    });

  }

  addSchedule() {
    const formValues = this.businessHours.value;

    const period = {
      day_of_week: formValues.day_of_week,
      start_local_time: formValues.start_local_time,
      end_local_time: formValues.end_local_time
    }

    if(this.schedule.length <=0) {
      this.schedule.push(JSON.stringify(period));
      this.scheduleCount.push(this.scheduleCount.length + 1);

    } else {
    if(this.schedule.includes(JSON.stringify(period))) {
        this.schedule.pop();
        this.scheduleCount.pop();        

      } else {
        this.schedule.push(JSON.stringify(period));
        this.scheduleCount.push(this.scheduleCount.length + 1);
      }
    }
    console.log(this.schedule.keys());

  console.log(this.schedule);
  }

  clearSchedule() {
    this.businessHours.reset();
  }

  resetForm(): void{
    this.newLocationForm.reset();
  }

  getCoordinates(): void {
    this.visibility = 'inherit';
    this.initMap();
  }

  initMap() {
    this.loader.load()
    .then(() => {

      let latLng = new google.maps.LatLng(-1.2920659, 36.821946199);

      const map = new google.maps.Map(
        document.getElementById('map') as HTMLElement,
        {
          mapId: '98d1420b851b24cd',
          zoom: 8,
          center: latLng,
          mapTypeId: 'roadmap'
        }
      );

      let svgMarker = {
        path: "M10.453 14.016l6.563-6.609-1.406-1.406-5.156 5.203-2.063-2.109-1.406 1.406zM12 2.016q2.906 0 4.945 2.039t2.039 4.945q0 1.453-0.727 3.328t-1.758 3.516-2.039 3.070-1.711 2.273l-0.75 0.797q-0.281-0.328-0.75-0.867t-1.688-2.156-2.133-3.141-1.664-3.445-0.75-3.375q0-2.906 2.039-4.945t4.945-2.039z",
        fillColor: "#9500c2",
        strokeColor: "#f0f7ff",
        fillOpacity: 0.9,
        rotation: 2.5,
        scale: 2.5,
        strokeWidth: 0.5,
        anchor: new google.maps.Point(15, 30),
      };


        map.setCenter({ lat: -1.2920659, lng: 36.821946199 });

        map.addListener('click', (mapsMouseEvent: any) => {
        map.setCenter(mapsMouseEvent.latLng);

        this.latitude = mapsMouseEvent.latLng.lat();
        this.longitude = mapsMouseEvent.latLng.lng();

        new google.maps.Marker({
          position: mapsMouseEvent.latLng,
          map: map,
          icon: svgMarker,
          animation: google.maps.Animation.DROP
        });
      });


    });
  }

  btnClose(): void{
    this.visibility = 'hidden';
  }
}
