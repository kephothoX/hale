import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { Observable, catchError, of } from 'rxjs';

import { ErrorService } from '../services/error.service';
import { AppService } from '../services/app.service';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(
    private _errorService: ErrorService,
    private _httpClient: HttpClient,
    private _router: Router,
    private _appService: AppService,
  ) { }

  uploadFile(files: any): Observable<any> {
    return this._httpClient.post(`${ this._appService.APIEndpoint }/files/upload`, files, this._appService.httpOptions).pipe(catchError(this._errorService.handleError));
  }

  getFiles(data: any): Observable<any> {
    return this._httpClient.post(`${ this._appService.APIEndpoint }/files`, data, this._appService.httpOptions).pipe(catchError(this._errorService.handleError ));
  }

  getFile(data: any): Observable<any> {
    return this._httpClient.post(`${ this._appService.APIEndpoint }/file`, data, this._appService.httpOptions).pipe(catchError(this._errorService.handleError ));
  }

  updateFile(data: any): Observable<any> {
    return this._httpClient.post(`${ this._appService.APIEndpoint }/files/update`, data, this._appService.httpOptions).pipe(catchError(this._errorService.handleError ));
  }

  sendFileSharableLink(data: any): Observable<any> {
    return this._httpClient.post(`${ this._appService.APIEndpoint }/file/share/send`, data, this._appService.httpOptions).pipe(catchError(this._errorService.handleError ));
  }

  removeSharableLink(data: any): Observable<any> {
    return this._httpClient.post(`${ this._appService.APIEndpoint }/file/share/remove`, data, this._appService.httpOptions).pipe(catchError(this._errorService.handleError ));
  }

  newFolder(data: any): Observable<any> {
    return this._httpClient.post(`${ this._appService.APIEndpoint }/folders/new`, data, this._appService.httpOptions).pipe(catchError(this._errorService.handleError ));
  }

  getSharedFiles(data: any): Observable<any> {
    return this._httpClient.post(`${ this._appService.APIEndpoint }/files/shared`, data, this._appService.httpOptions).pipe(catchError(this._errorService.handleError ));
  }

  newSharedFile(data: any): Observable<any> {
    return this._httpClient.post(`${ this._appService.APIEndpoint }/files/share/new`, data, this._appService.httpOptions).pipe(catchError(this._errorService.handleError ));
  }

  authFlowStart(data: any): Observable<any> {
    return this._httpClient.post(`${ this._appService.APIEndpoint }/auth/flow/start`, {
      email: data.email,
    }, this._appService.httpOptions).pipe(catchError(this._errorService.handleError))

  }

}


  