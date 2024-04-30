import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms'
import { LocationsService } from '../locations.service';
import { ActivatedRoute, Router } from '@angular/router';

import { BookingsService } from 'src/app/bookings/bookings.service';
import { Loader } from '@googlemaps/js-api-loader';

import { MatSnackBar } from '@angular/material/snack-bar';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import {  MatTable } from '@angular/material/table';
import {  MatPaginator } from '@angular/material/paginator';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {  MatSort } from '@angular/material/sort';
import { Location, Periods } from '../../interfaces/location';
import { Catalogue } from 'src/app/catalog/catalog';
import { CatalogService } from 'src/app/catalog/catalog.service';
import { TeamService } from 'src/app/team/team.service';
import { Team } from 'src/app/team/team';
import { Services } from '../services';

@Component({
  selector: 'app-view-location',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
  Catalog?: Catalogue[];
  btnClosevisibility: string = 'hidden';
  location_id?: string;
  periods: Periods[] = new Array();

  Location?: Location;
  Services?: Services[];

  displayedColumns: string[] = ['name',  'service_name', 'actions'];
  clickedRows = new Set<Services[]>();
  columnsToDisplay: string[] = new Array();

  

  pageLength: number = 15;
  pageSize: number = 20;
  pageSizeOptions: number[] = [15, 30, 60, 120, 240, 480, 960];

  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatTable) table?: MatTable<Services>;
  @ViewChild(MatSort) sort?: MatSort;

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.columnsToDisplay, event.previousIndex, event.currentIndex )
  }



  ngOnInit() {
    for(let column of this.displayedColumns) {
      this.columnsToDisplay.push(column);
    }



    const id = this._activatedRoute.snapshot.params['id'];
    this.location_id = id;

    window.localStorage.setItem('Active_Loc', id);

    this._locationsService.getLocation({id: id}).subscribe((response: any) => {

      console.log(response)
      this.Location = response.SQResponse.location;

      console.log(this.Location);
    });

    this._catalogService.searchCatalogItems(
      {
        product_types: [ "APPOINTMENTS_SERVICE" ],
        enabled_location_ids:  [ this.location_id  ]
      }
    ).subscribe((response: any) => {
      this.Services = response.SQResponse.items;

      console.log(this.Services);
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

  API_KEY: string = '*********';

  MapChoice: string = '';

  loader: any = new Loader({
    'apiKey': this.API_KEY,
    'version': 'weekly',
    'libraries': [ 'geometry', 'places']
  });

  constructor(
    private _locationsService: LocationsService,    
    public _matSnackBar: MatSnackBar,
    public _matDialog: MatDialog,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _catalogService: CatalogService
  ) { }

  newBookingDialog(service_id: String, location_id: any) {
    const dialogRef = this._matDialog.open(NewBookingDialog, { data: {
      serviceId: service_id,
      locationId: location_id
    }});

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
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

}

@Component({
  selector: 'new-booking-dialog',
  templateUrl: '../new-booking.html',
})
export class NewBookingDialog implements OnInit {
  TeamMembers?: Team[];
  LocationType: String[] = ['BUSINESS_LOCATION', 'CUSTOMER_LOCATION', 'PHONE'];

  constructor(
    @Inject(MAT_DIALOG_DATA) public Data: locData,
    private _formBuilder: FormBuilder,
    private _bookingsService: BookingsService,
    public _matSnackbar: MatSnackBar,
    private _teamService: TeamService,
  ) {}

  ngOnInit(): void {
    this._teamService.getTeamMembers(
      {
        query: {
          filter: {
            location_ids: [`${this.Data.locationId}`]
          }
        }
      }
    ).subscribe((response: any) => {
        this.TeamMembers = response.SQResponse.team_members;

        console.log(this.TeamMembers);
    });

  }

  newBookingForm = this._formBuilder.group({
    customer_note : ['', Validators.required],
    team_member_id: ['', Validators.required ],
    location_type: ['', Validators.required ],
    start_at: ['', Validators.required ]
  });


  ngOnSubmitBooking(): void {
    const booking = {
      idempotency_key: window.crypto.randomUUID(),
      booking: {
        customer_id: window.sessionStorage.getItem('SQ_User_ID'),
        customer_note: this.newBookingForm.value.customer_note,
        location_id: this.Data.locationId,
        location_type: this.newBookingForm.value.location_type,
        seller_note: `New Booking from ${window.sessionStorage.getItem('given_name')}  ${window.sessionStorage.getItem('family_name')}`,
        start_at:  new Date(`${ this.newBookingForm.value.start_at }`).toISOString(),
        appointment_segments: [
        {
          team_member_id: this.newBookingForm.value.team_member_id,
          duration_minutes: 60,
          service_variation_id: this.Data.serviceId,
          service_variation_version: 1
        }
      ]
      }
    }

    console.log(booking);
    

    this._bookingsService.newBooking(booking).subscribe((response: any) => {
      console.log('Booking Response: ', response);
    });
  }

  resetForm(): void{
    this.newBookingForm.reset();
  }
}

export interface locData {
  serviceId: String;
  locationId: String;
}

