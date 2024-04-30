import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, catchError } from 'rxjs';

import { AppService } from 'src/app/services/app.service';
import { ErrorService } from 'src/app/services/error.service';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  constructor(
    private _httpClient: HttpClient,
    private _appService: AppService,
    private _errorService: ErrorService,
  ) { }


  getCustomerCards(data: any): Observable<any> {
    return this._httpClient.post(`${this._appService.APIEndpoint}/square/cards`, data, this._appService.httpOptions).pipe(catchError(this._errorService.handleError));
  }

  getCard(data: any): Observable<any> {
    return this._httpClient.post(`${this._appService.APIEndpoint}/square/card`, data, this._appService.httpOptions).pipe(catchError(this._errorService.handleError));
  }

   disableCard(data: any): Observable<any> {
    return this._httpClient.post(`${this._appService.APIEndpoint}/square/card/disable`, data, this._appService.httpOptions).pipe(catchError(this._errorService.handleError));
  }

  generateNewInvoice(data: any): Observable<any> {
    return this._httpClient.post(`${ this._appService.APIEndpoint}/square/invoices/new`, data, this._appService.httpOptions).pipe(catchError(this._errorService.handleError));
  }

  newPayment(payment: any): Observable<any> {
    return this._httpClient.post(`${ this._appService.APIEndpoint }/square/payments/new`, payment, this._appService.httpOptions).pipe(catchError(this._errorService.handleError));

  }

  getInvoices(data: any): Observable<any> {
    return this._httpClient.post(`${ this._appService.APIEndpoint}/square/invoices`, data, this._appService.httpOptions).pipe(catchError(this._errorService.handleError));
  }  

  addNewCard(data: any): Observable<any> {
    return this._httpClient.post(`${ this._appService.APIEndpoint}/square/cards/new`, data, this._appService.httpOptions).pipe(catchError(this._errorService.handleError));
  }

   newOrder(data: any): Observable<any> {
    return this._httpClient.post(`${ this._appService.APIEndpoint}/square/orders/new`, data, this._appService.httpOptions).pipe(catchError(this._errorService.handleError));
  }

}
