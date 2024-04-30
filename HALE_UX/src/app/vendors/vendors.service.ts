import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, catchError } from 'rxjs';

import { AppService } from 'src/app/services/app.service';
import { ErrorService } from 'src/app/services/error.service';

@Injectable({
  providedIn: 'root'
})
export class VendorsService {

  constructor(
    private _httpClient: HttpClient,
    private _appService: AppService,
    private _errorService: ErrorService,
  ) { }

  newVendor(data: any): Observable<any> {
    return this._httpClient.post(`${ this._appService.APIEndpoint }/square/vendors/new`, data, this._appService.httpOptions).pipe(catchError(this._errorService.handleError));
  }

  getVendors(data: any): Observable<any> {
    return this._httpClient.post(`${ this._appService.APIEndpoint }/square/vendors`, data, this._appService.httpOptions).pipe(catchError(this._errorService.handleError));
  }

  getVendor(data: any): Observable<any> {
    return this._httpClient.post(`${ this._appService.APIEndpoint }/square/vendor`, data, this._appService.httpOptions).pipe(catchError(this._errorService.handleError));
  }

  updateVendor(data: any): Observable<any> {
    return this._httpClient.post(`${ this._appService.APIEndpoint }/square/vendors/update`, data, this._appService.httpOptions).pipe(catchError(this._errorService.handleError));
  }
}

