import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, catchError } from 'rxjs';

import { Payment } from  '../../app/checkout/payment';
import { AppService } from 'src/app/services/app.service';
import { ErrorService } from 'src/app/services/error.service';

@Injectable({
  providedIn: 'root'
})
export class BookingsService {

  constructor(
    private _httpClient: HttpClient,
    private _appService: AppService,
    private _errorService: ErrorService,
  ) { }


  newBooking(data: any): Observable<any> {
    return this._httpClient.post(`${ this._appService.APIEndpoint }/square/bookings/new`, data, this._appService.httpOptions).pipe(catchError(this._errorService.handleError));
  }

  listBookings(data: any): Observable<any> {
    return this._httpClient.post(`${ this._appService.APIEndpoint }/square/bookings/list`, data, this._appService.httpOptions).pipe(catchError(this._errorService.handleError));
  }


  getBooking(data: any): Observable<any> {
    return this._httpClient.post(`${ this._appService.APIEndpoint }/square/booking`, data, this._appService.httpOptions).pipe(catchError(this._errorService.handleError));
  }
}
