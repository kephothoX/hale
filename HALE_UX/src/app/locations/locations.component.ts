import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Loader } from '@googlemaps/js-api-loader';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

import { LocationsService } from './locations.service';
import { Location } from '../interfaces/location';
import { BookingsService } from '../bookings/bookings.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss']
})
export class LocationsComponent implements OnInit {
  visibility: string = 'hidden';
  btnClosevisibility: string = 'hidden';

  latitude?: number;
  longitude?: number;

  AddressType: string[] = ['PHYSICAL', 'MOBILE'];

  API_KEY: string = '*******';

  Locations: Location[] = [];
  displayedColumns: string[] = ['name', 'description', 'phone_number', 'type', 'status', 'id'];

  constructor(
    private _locationsService: LocationsService,
    public _matDialog: MatDialog,
    public _matSnackBar: MatSnackBar,
  ) { }

  MapChoice: string = '';

  loader: any = new Loader({
    'apiKey': this.API_KEY,
    'version': 'weekly',
    'libraries': [ 'geometry', 'places']
  });



  ngOnInit() {
    this.getLocations();
  }

  getLocations() {
    this._locationsService.listLocations().subscribe((results: any) => {
      this.Locations = results.SQResponse.locations;
      console.log('Locations: ', this.Locations);
    });
  }


  findMe(lat: number, lng?: number): void {
    this.visibility = 'inherit';
    this.initMap(lat, lng);
  }


  initMap(lat: number, lng?: number) {
    this.btnClosevisibility = 'inherit';
    this.loader.load()
    .then(() => {

      let latLng = new google.maps.LatLng(lat, lng);

      const map = new google.maps.Map(
        document.getElementById('findMe') as HTMLElement,
        {
          mapId: '98d1420b851b24cd',
          zoom: 16,
          center: latLng,
          mapTypeId: 'roadmap'
        }
      );

      let svgMarker = {
        path: "M10.453 14.016l6.563-6.609-1.406-1.406-5.156 5.203-2.063-2.109-1.406 1.406zM12 2.016q2.906 0 4.945 2.039t2.039 4.945q0 1.453-0.727 3.328t-1.758 3.516-2.039 3.070-1.711 2.273l-0.75 0.797q-0.281-0.328-0.75-0.867t-1.688-2.156-2.133-3.141-1.664-3.445-0.75-3.375q0-2.906 2.039-4.945t4.945-2.039z",
        fillColor: "#245100",
        strokeColor: "#f0f7ff",
        fillOpacity: 0.9,
        rotation: 2.5,
        scale: 2.5,
        strokeWidth: 0.5,
        anchor: new google.maps.Point(15, 30),
      };


      map.setCenter(latLng);

      new google.maps.Marker({
        position: latLng,
        map: map,
        icon: svgMarker,
        animation: google.maps.Animation.DROP
      });
    });
  }

  btnClose(): void{
    this.visibility = 'hidden';
  }


  deleteLocation(id: string) {

  }

}




