import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { ErrorService } from './error.service';
import { Observable, catchError, of} from 'rxjs';

import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(
    private _errorService: ErrorService,
    private _httpClient: HttpClient,
    private _router: Router,
  ) {  }

  httpOptions = {
    headers: new HttpHeaders({
      'Authorization': 'Bearer EAAAEPjqBUc-7yeke8wBdzKQyEYdHOqz8MTuQYYxe46hS1jFz8tHqTiJ_1EemRgj'
    })
  }

  APIEndpoint = '/api/v1'; //environment.apiEndpoint;


  listMerchants(): Observable<any> {

    return this._httpClient.get(`${ this.APIEndpoint }/square/merchants`).pipe(catchError(this._errorService.handleError));
  }

    getLanguageCodes(): Observable<any> {
    return of ([

      { 
        Name : "Australian English",
        Value: "en-AU" 
      },
      { 
        Name: "Canada French",
        Value: "fr-CA"
      },
      { 
        Name: "Canadian English",
        Value:  "en-CA"
      },
      { 
        Name: "French",
        Value: "fr" 
      },
      { 
        Name: "Ireland English",
        Value: "en-IE"
      },
      { 
        Name: "Japan",
        Value: "ja" 
      },
      { 
        Name: "United Kingdom English",
        Value: "en-GB"
      },
      { 
        Name: "United States English",
        Value:  "en-US"
      }

    ])
  }

  getTimezones(): Observable<any> {
    return this._httpClient.get('/assets/TimeZones.json').pipe(catchError(this._errorService.handleError));
  }


  getCountryCodes(): Observable<any> {
      return this._httpClient.get('/assets/Countries.json').pipe(catchError(this._errorService.handleError));
  }

  getMCCCodes(): Observable<any> {
      return this._httpClient.get('/assets/MCC_Codes.json').pipe(catchError(this._errorService.handleError));
  }


  
}
