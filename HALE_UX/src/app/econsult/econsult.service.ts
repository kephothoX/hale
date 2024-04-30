import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, catchError } from 'rxjs';

import { AppService } from 'src/app/services/app.service';
import { ErrorService } from 'src/app/services/error.service';

@Injectable({
  providedIn: 'root'
})
export class EconsultService {

  constructor(
    private _httpClient: HttpClient,
    private _appService: AppService,
    private _errorService: ErrorService,
  ) { }


  getTeamMembers(data: any): Observable<any> {
    return this._httpClient.post(`${ this._appService.APIEndpoint }/square/team/members`, data, this._appService.httpOptions).pipe(catchError(this._errorService.handleError));
  }


}
