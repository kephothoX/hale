import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { BookingsService } from './bookings.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import {  MatTable } from '@angular/material/table';
import {  MatPaginator } from '@angular/material/paginator';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {  MatSort } from '@angular/material/sort';


import { Booking } from './booking';
@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrl: './bookings.component.scss'
})
export class BookingsComponent implements OnInit {
  Bookings?: Booking[];

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _bookingService: BookingsService,
    public _matDialog: MatDialog,
  ) {}

  displayedColumns: string[] = ['customer_id',  'status', 'start_at', 'actions'];
  clickedRows = new Set<Booking[]>();
  columnsToDisplay: string[] = new Array();

  

  pageLength: number = 15;
  pageSize: number = 20;
  pageSizeOptions: number[] = [15, 30, 60, 120, 240, 480, 960];

  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatTable) table?: MatTable<Booking>;
  @ViewChild(MatSort) sort?: MatSort;

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.columnsToDisplay, event.previousIndex, event.currentIndex )
  }



  ngOnInit() {
    for(let column of this.displayedColumns) {
      this.columnsToDisplay.push(column);
    }

    const id = this._activatedRoute.snapshot.params['id'];
    console.log(id);

    const filter_dataset = {
      location_id: window.localStorage.getItem('Active_Loc'),
      customer_id: '',
      team_member_id: ''
    }

    this._bookingService.listBookings(filter_dataset).subscribe((response: any) => {
      this.Bookings = response.SQResponse.bookings;

      console.log(this.Bookings);
    });
  }

  viewBookingDialog(booking_id: String) {
    const dialogRef = this._matDialog.open(ViewBookingDialog, { data: {
      bookingId: booking_id
    }});

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }


}

@Component({
  selector: 'view-booking-dialog',
  templateUrl: './view-booking.html',
})
export class ViewBookingDialog implements OnInit {
  Booking?: Booking;

  constructor (
    @Inject(MAT_DIALOG_DATA) public Data: bookingData,
    private _bookingService: BookingsService
  ) {}

  ngOnInit(): void {
    this._bookingService.getBooking({ booking_id: this.Data.bookingId }).subscribe((response: any) => {
      
      this.Booking = response.SQResponse.booking;
      console.log(this.Booking);
    });
  }

}

export interface bookingData {
  bookingId: String;
}

