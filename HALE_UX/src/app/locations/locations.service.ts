import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, catchError } from 'rxjs';


import { AppService } from 'src/app/services/app.service';
import { ErrorService } from 'src/app/services/error.service';

@Injectable({
  providedIn: 'root'
})
export class LocationsService {

  constructor(
    private _httpClient: HttpClient,
    private _appService: AppService,
    private _errorService: ErrorService,
  ) { }


  addNewLocation(data: any): Observable<any> {
    return this._httpClient.post(`${ this._appService.APIEndpoint }/square/locations/new`, data, this._appService.httpOptions).pipe(catchError(this._errorService.handleError));
  }

  updateLocation(data: any): Observable<any> {
    return this._httpClient.post(`${ this._appService.APIEndpoint }/square/locations/update`, data, this._appService.httpOptions).pipe(catchError(this._errorService.handleError));
  }

  getLocation(data: any): Observable<any> {
    return this._httpClient.post(`${ this._appService.APIEndpoint }/square/location`, data,  this._appService.httpOptions).pipe(catchError(this._errorService.handleError));
  }

  editLocation(location: any): Observable<any> {
    return this._httpClient.post(`${ this._appService.APIEndpoint }/square/locations/edit`, location, this._appService.httpOptions).pipe(catchError(this._errorService.handleError));
  }

  listLocations(): Observable<any> {
    return this._httpClient.get(`${ this._appService.APIEndpoint }/square/locations`, this._appService.httpOptions).pipe(catchError(this._errorService.handleError));
  }

  saveLocation(params: any): Observable<any> {
    return this._httpClient.post(`${ this._appService.APIEndpoint }/locations/new`, params).pipe(catchError(this._errorService.handleError));
  }

  getLocations(params: any): Observable<any> {
    return this._httpClient.post(`${ this._appService.APIEndpoint }/locations`, params).pipe(catchError(this._errorService.handleError));
  }

}
