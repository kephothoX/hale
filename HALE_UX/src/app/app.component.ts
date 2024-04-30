import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { AppService } from './services/app.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Hale Health';
  ActiveSession: any = window.sessionStorage.getItem('active_session');

  constructor(
    private _appService: AppService,
    private _router: Router
  ){

  }

  ngOnInit() {

    this.getBusinessDetails();

    /*if(this.ActiveSession === 'false' ||  this.ActiveSession === null || this.ActiveSession === undefined)  {

      this._router.navigate(['/auth/signin']);
    }*/
  }


  getBusinessDetails() {
    this._appService.listMerchants().subscribe((results: any) => {
     window.sessionStorage.setItem('SQ_Main_Loc', results.SQResponse.merchant[0].main_location_id);
    });
  }
}
