import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, catchError } from 'rxjs';

import { AppService } from 'src/app/services/app.service';
import { ErrorService } from 'src/app/services/error.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {

  constructor(
    private _httpClient: HttpClient,
    private _appService: AppService,
    private _errorService: ErrorService,
  ) { }


  newcheckoutPaymentLink(data: any): Observable<any> {
    return this._httpClient.post(`${this._appService.APIEndpoint}/square/checkout/links/create`, data, this._appService.httpOptions).pipe(catchError(this._errorService.handleError));
  }

  getcheckoutPaymentLinks(): Observable<any> {
    return this._httpClient.get(`${this._appService.APIEndpoint}/square/checkout/links`, this._appService.httpOptions).pipe(catchError(this._errorService.handleError));
  }

}