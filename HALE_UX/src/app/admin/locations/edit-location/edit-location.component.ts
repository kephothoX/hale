import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LocationsService } from '../../../locations/locations.service';
import { ActivatedRoute, Router } from '@angular/router';


import { Loader } from '@googlemaps/js-api-loader';

import { MatSnackBar } from '@angular/material/snack-bar';

import { Location, Periods } from '../../../locations/location';




@Component({
  selector: 'app-edit-location',
  templateUrl: './edit-location.component.html',
  styleUrls: ['./edit-location.component.scss']
})
export class EditLocationComponent implements OnInit {
  btnClosevisibility: string = 'hidden';
  location_id?: string;
  periods: Periods[] = new Array();

  location?: Location;


  ngOnInit() {
    const id = this._activatedRoute.snapshot.params['id'];
    this.location_id = id;

    this._locationsService.getLocation({id: id}).subscribe((response: any) => {
      this.location = response.location
    });
  }

  visibility: string = 'hidden';
  isOpen: boolean = false;

  scheduleCount: any[] = new Array('newSchedule',);
  schedule: any[] = new Array();

  latitude?: number;
  longitude?: number;

  daysOfTheWeek: string[] = [ "SUN", "MON", "TUE", "WED", "THU",  "FRI",  "SAT" ];

  AddressType: string[] = ['PHYSICAL', 'MOBILE'];

  API_KEY: string = '******';

  MapChoice: string = '';

  loader: any = new Loader({
    'apiKey': this.API_KEY,
    'version': 'weekly',
    'libraries': [ 'geometry', 'places']
  });

  constructor(
    private _formBuilder: FormBuilder,
    private _locationsService: LocationsService,
    
    public _matSnackBar: MatSnackBar,
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) { }

  editLocationForm = this._formBuilder.group({
    name: ['', Validators.required],
    admin_name: ['', Validators.required],
    phone_number: ['', Validators.required],
    admin_email: ['', Validators.required],
    description: ['', Validators.required],
    address: this._formBuilder.group({
      address_line_1: ['', Validators.required],
      address_line_2: ['', Validators.required],
      locality: ['', Validators.required],
      administrative_district_level_1: ['', Validators.required],
      postal_code: ['', Validators.required],
    }),
    twitter_username: ['', Validators.required],
    instagram_username: ['', Validators.required],
    facebook_url: ['', Validators.required],
    website_url: ['', Validators.required],
    type: ['', Validators.required],
    admin_hours: this._formBuilder.group({
      day_of_week: ['', Validators.required],
      start_local_time: ['', Validators.required],
      end_local_time: ['', Validators.required]
    }),
    coordinates: this._formBuilder.group({
      latitude: ['', Validators.required],
      longitude: ['', Validators.required],
    })
  });

  onSubmit() {
    this.scheduleCount.pop();
    this.addSchedule();

    const formValues = this.editLocationForm.value;

    const per = formValues.admin_hours;

    const dataSet = {
      id: this.location?.id,
      data: {
        'location': {
          name: formValues.name,
          description: formValues.description,
          admin_name: formValues.admin_name,
          admin_email: formValues.admin_email,
          phone_number: formValues.phone_number,
          address: {
            address_line_1: formValues.address?.address_line_1,
            address_line_2: formValues.address?.address_line_2,
            locality: formValues.address?.locality,
            administrative_district_level_1: formValues.address?.administrative_district_level_1,
            postal_code: formValues.address?.postal_code
          },
          twitter_username: formValues.twitter_username,
          instagram_username: formValues.instagram_username,
          facebook_url: formValues.facebook_url,
          website_url: formValues.website_url,
          type: formValues.type,
          admin_hours: {
            periods: this.schedule,
          },
          coordinates: {
            latitude: formValues.coordinates?.latitude,
            longitude: formValues.coordinates?.longitude
          }
        }
      }
    };

    this._locationsService.updateLocation(JSON.stringify(dataSet)).subscribe((response: any) => {
      this._matSnackBar.open('Location Updated Successfully', 'Close');

      this.resetForm();
      
    });
  }

  addSchedule() {
   this.scheduleCount.push('newSchedule');

   const formValues = this.editLocationForm.value;

    const periods = {
      day_of_week: formValues.admin_hours?.day_of_week,
      start_local_time: formValues.admin_hours?.start_local_time,
      end_local_time: formValues.admin_hours?.end_local_time
    }


    this.schedule.push(periods);

  }

  resetForm(): void{
    this.editLocationForm.reset();
    this._router.navigate(['/admin/locations']);
  }

  getCoordinates(): void {
    this.visibility = 'inherit';
    this.initMap();
  }

  initMap() {
    this.btnClosevisibility = 'inherit';
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
