import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { Observable, catchError, of } from 'rxjs';

import { ErrorService } from '../services/error.service';
import { AppService } from '../services/app.service';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private _errorService: ErrorService,
    private _httpClient: HttpClient,
    private _router: Router,
    private _appService: AppService,
  ) { }

  getCustomers(): Observable<any> {
    return this._httpClient.get(`${ this._appService.APIEndpoint }/square/customers`, this._appService.httpOptions).pipe(catchError(this._errorService.handleError));
  }

  getCustomer(data: any): Observable<any> {
    return this._httpClient.post(`${ this._appService.APIEndpoint }/square/customer`, data, this._appService.httpOptions).pipe(catchError(this._errorService.handleError));
  }

  updateCustomer(data: any): Observable<any> {
    return this._httpClient.post(`${ this._appService.APIEndpoint }/square/customers/update`, data, this._appService.httpOptions).pipe(catchError(this._errorService.handleError));
  }

  deleteUser(data: any): Observable<any> {
    return this._httpClient.post(`${ this._appService.APIEndpoint }/square/customers/delete`, data, this._appService.httpOptions).pipe(catchError(this._errorService.handleError));
  }

  newSquareCustomer(user: any): Observable<any> {
    return this._httpClient.post(`${ this._appService.APIEndpoint }/square/customers/new`, user, this._appService.httpOptions).pipe(catchError(this._errorService.handleError));
  }

  authFlowStart(data: any): Observable<any> {
    return this._httpClient.post(`${ this._appService.APIEndpoint }/auth/flow/start`, data, this._appService.httpOptions).pipe(catchError(this._errorService.handleError))
  }

  authFlowUpdate(data: any): Observable<any> {
    return this._httpClient.post(`${ this._appService.APIEndpoint }/auth/flow/update`,data, this._appService.httpOptions).pipe(catchError(this._errorService.handleError))
  }

  authFlowRestart(data: any): Observable<any> {
    return this._httpClient.post(`${ this._appService.APIEndpoint }/auth/flow/restart`,data, this._appService.httpOptions).pipe(catchError(this._errorService.handleError))
  }

  completeUserSignUp(data: any) {
    const dataSet = {
      flow_id: data.flow_id,
      first_name: data.first_name,
      last_name: data.last_name,
      password: data.password
    };
  }


  newUser(data: any): Observable<any> {
    return this._httpClient.post(`${ this._appService.APIEndpoint }/auth/users/new`, data, this._appService.httpOptions).pipe(catchError(this._errorService.handleError));
  }

  inviteUser(data: any): Observable<any> {
    return this._httpClient.post(`${ this._appService.APIEndpoint }/auth/users/invite`, data, this._appService.httpOptions).pipe(catchError(this._errorService.handleError));
  }

  updateUser(data: any): Observable<any> {
    return this._httpClient.put(`${ this._appService.APIEndpoint }/auth/users/update`, data, this._appService.httpOptions).pipe(catchError(this._errorService.handleError));
  }

  getUser(data: any): Observable<any> {
    return this._httpClient.post(`${ this._appService.APIEndpoint }/auth/user`, data, this._appService.httpOptions).pipe(catchError(this._errorService.handleError));
  }

  getUserSessions(data: any): Observable<any> {
    return this._httpClient.post(`${ this._appService.APIEndpoint }/auth/user/sessions`, data, this._appService.httpOptions).pipe(catchError(this._errorService.handleError));
  }


  getSquareCustomer(data: any): Observable<any> {
    return this._httpClient.post(`${ this._appService.APIEndpoint }/square/customer`, data, this._appService.httpOptions).pipe(catchError(this._errorService.handleError));
  }



  verifyUser(data: any): Observable<any> {
    return this._httpClient.post(`${ this._appService.APIEndpoint }/auth/users/verify`, data, this._appService.httpOptions).pipe(catchError(this._errorService.handleError));

  }


  verifyPassword(data: any): Observable<any> {
    return this._httpClient.post(`${ this._appService.APIEndpoint }/password/verify`, data,  this._appService.httpOptions).pipe(catchError(this._errorService.handleError));
  }

  verifyEmail(data: any): Observable<any> {
    return this._httpClient.post(`${ this._appService.APIEndpoint }/email/verify`, data, this._appService.httpOptions).pipe(catchError(this._errorService.handleError));
  }

  
  getFlowState(data: any): Observable<any> {
    return this._httpClient.post(`${ this._appService.APIEndpoint }/flow/state`, data, this._appService.httpOptions).pipe(catchError(this._errorService.handleError));
  }

  flowComplete(data: any): Observable<any> {
    return this._httpClient.post(`${ this._appService.APIEndpoint }/flow/complete`, data, this._appService.httpOptions).pipe(catchError(this._errorService.handleError));
  }

  loginWithPassword(data: any): Observable<any> {
    return this._httpClient.post(`${ this._appService.APIEndpoint }/password/login`, data, this._appService.httpOptions).pipe(catchError(this._errorService.handleError));
  }

  passwordReset(data: any): Observable<any> {
    return this._httpClient.post(`${ this._appService.APIEndpoint }/password/reset`, data, this._appService.httpOptions).pipe(catchError(this._errorService.handleError));
  }

  auditLog(data: any): Observable<any> {
    return this._httpClient.post(`${ this._appService.APIEndpoint }/audit/log`, data, this._appService.httpOptions).pipe(catchError(this._errorService.handleError));
  }

  checkEmailBreach(data: any): Observable<any> {
    return this._httpClient.post(`${ this._appService.APIEndpoint }/check/email/breach`, data, this._appService.httpOptions).pipe(catchError(this._errorService.handleError));
  }

  logoutUser(data: any): Observable<any> {
    return this._httpClient.post(`${ this._appService.APIEndpoint }/auth/users/logout`, data, this._appService.httpOptions).pipe(catchError(this._errorService.handleError));
  }

  updateUserPassword(data: any): Observable<any> {
    return this._httpClient.put(`${ this._appService.APIEndpoint }/auth/users/password/update`, data, this._appService.httpOptions).pipe(catchError(this._errorService.handleError));
  }


  getLocationId(): Observable<any> {
    return this._httpClient.get(`${ this._appService.APIEndpoint }/getSquareMainLocation`, this._appService.httpOptions).pipe(catchError(this._errorService.handleError));
  }

  getuserByEmailAddress(email: string): Observable<any> {

    const qs = {
      "limit": 1,
      "query": {
        "filter": {
          "email_address": {
            "exact": email
          }
        }
      }
    };

    return this._httpClient.post(`${ this._appService.APIEndpoint }/square/customer/email`, qs, this._appService.httpOptions).pipe(catchError(this._errorService.handleError));
  }

  

  
  isAdminLoggedIn(): boolean {
    const status =  Boolean(window.sessionStorage.getItem('canLoginAsAdmin'));

    if (status == true) {
      return true;
    } else {

      setTimeout(() => {
        this._router.navigate(['/admin/auth/signin']);
      });

      return false;
    }
  }

  isUserLoggedIn(): boolean {
    const status = Boolean(window.sessionStorage.getItem('auth_login_status'));

    if (status == true) {
      return true;
    } else {

      setTimeout(() => {
        this._router.navigate(['/auth/signin']);
      });

      return false;
    }
  }
}
