import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, catchError } from 'rxjs';

import { AppService } from 'src/app/services/app.service';
import { ErrorService } from 'src/app/services/error.service';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionsService {

  constructor(
    private _httpClient: HttpClient,
    private _appService: AppService,
    private _errorService: ErrorService,
  ) { }

  pauseSubscription(data: any): Observable<any> {
    return this._httpClient.post(`${ this._appService.APIEndpoint }/square/subscriptions/pause`, data,  this._appService.httpOptions).pipe(catchError(this._errorService.handleError));
  }

  cancelSubscription(data: any): Observable<any> {
    return this._httpClient.post(`${ this._appService.APIEndpoint }/square/subscriptions/cancel`, data, this._appService.httpOptions).pipe(catchError(this._errorService.handleError));
  }

  resumeSubscription(data: any): Observable<any> {
    return this._httpClient.post(`${ this._appService.APIEndpoint }/square/subscriptions/resume`, data, this._appService.httpOptions).pipe(catchError(this._errorService.handleError));
  }

  getSubscriptionById(data: any): Observable<any> {
    return this._httpClient.post(`${ this._appService.APIEndpoint }/square/subscriptions/id`, data, this._appService.httpOptions).pipe(catchError(this._errorService.handleError));
  }

  newSubscriptionPlan(data: any): Observable<any> {
    return this._httpClient.post(`${ this._appService.APIEndpoint }/square/subscriptions/new`, data, this._appService.httpOptions).pipe(catchError(this._errorService.handleError));
  }

  newSubscriptionPlanOnlineCheckout(data: any): Observable<any> {
    return this._httpClient.post(`${ this._appService.APIEndpoint}/square/subscriptions/online/checkout`, data, this._appService.httpOptions).pipe(catchError(this._errorService.handleError));
  }

  getSubscriptions(data: any): Observable<any> {
    return this._httpClient.post(`${this._appService.APIEndpoint}/square/subscriptions`, data, this._appService.httpOptions).pipe(catchError(this._errorService.handleError));
  } 
}
