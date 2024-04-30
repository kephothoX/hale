import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, catchError } from 'rxjs';

import { AppService } from 'src/app/services/app.service';
import { ErrorService } from 'src/app/services/error.service';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {

 constructor(
    private _httpClient: HttpClient,
    private _appService: AppService,
    private _errorService: ErrorService,
  ) { }

  addNewCatalog(data: any): Observable<any> {
    return this._httpClient.post(`${ this._appService.APIEndpoint }/square/catalog/new`, data, this._appService.httpOptions).pipe(catchError(this._errorService.handleError));
  }

  listCatalog(): Observable<any> {
    return this._httpClient.get(`${ this._appService.APIEndpoint }/square/catalog`, this._appService.httpOptions).pipe(catchError(this._errorService.handleError));
  }

  getCatalogItems(): Observable<any> {
    return this._httpClient.get(`${ this._appService.APIEndpoint }/square/catalog/items`, this._appService.httpOptions).pipe(catchError(this._errorService.handleError));
  }

  getCatalogObject(object_id: string): Observable<any> {
    return this._httpClient.post(`${ this._appService.APIEndpoint }/catalog/object/id`, object_id, this._appService.httpOptions).pipe(catchError(this._errorService.handleError));
  }

  getCatalogWithID(data: any): Observable<any> {
    return this._httpClient.post(`${ this._appService.APIEndpoint }/square/catalog`, data, this._appService.httpOptions).pipe(catchError(this._errorService.handleError));
  }

  searchCatalog(data: any): Observable<any> {
    return this._httpClient.post(`${ this._appService.APIEndpoint }/square/catalog/search`, data, this._appService.httpOptions).pipe(catchError(this._errorService.handleError));
  }

  searchCatalogItems(data: any): Observable<any> {
    return this._httpClient.post(`${ this._appService.APIEndpoint }/square/catalog/items/search`, data, this._appService.httpOptions).pipe(catchError(this._errorService.handleError));
  }

  generateNewOrder(data: any): Observable<any> {
    return this._httpClient.post(`${ this._appService.APIEndpoint}/square/orders/new`, data, this._appService.httpOptions).pipe(catchError(this._errorService.handleError));
  }

  getCatalogItemById(data: any): Observable<any> {
    return this._httpClient.post(`${ this._appService.APIEndpoint}/square/catalog/item`, data, this._appService.httpOptions).pipe(catchError(this._errorService.handleError));
  }

  addNewCatalogItem(data: any): Observable<any> {
    return this._httpClient.post(`${ this._appService.APIEndpoint }/square/catalog/new`, data, this._appService.httpOptions).pipe(catchError(this._errorService.handleError));
  }

  newCatalogImageItem(data: any): Observable<any> {
    return this._httpClient.post(`${ this._appService.APIEndpoint }/square/catalog/image/new`, data, this._appService.httpOptions).pipe(catchError(this._errorService.handleError));
  }

}
