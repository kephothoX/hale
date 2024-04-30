import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, catchError } from 'rxjs';

import { AppService } from 'src/app/services/app.service';
import { ErrorService } from 'src/app/services/error.service';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  constructor(
    private _httpClient: HttpClient,
    private _appService: AppService,
    private _errorService: ErrorService,
  ) { }

  newTeamMember(data: any): Observable<any> {
    return this._httpClient.post(`${ this._appService.APIEndpoint }/square/team/members/new`, data, this._appService.httpOptions).pipe(catchError(this._errorService.handleError));
  }

  getTeamMembers(data: any): Observable<any> {
    return this._httpClient.post(`${ this._appService.APIEndpoint }/square/team/members`, data, this._appService.httpOptions).pipe(catchError(this._errorService.handleError));
  }

  getTeamMember(data: any): Observable<any> {
    return this._httpClient.post(`${ this._appService.APIEndpoint }/square/team/member`, data, this._appService.httpOptions).pipe(catchError(this._errorService.handleError));
  }

  updateTeamMember(data: any): Observable<any> {
    return this._httpClient.post(`${ this._appService.APIEndpoint }/square/team/members/update`, data, this._appService.httpOptions).pipe(catchError(this._errorService.handleError));
  }
}
