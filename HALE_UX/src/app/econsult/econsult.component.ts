import { Component, OnInit } from '@angular/core';

import { Econsult } from './econsult';
import { EconsultService } from './econsult.service';
@Component({
  selector: 'app-econsult',
  templateUrl: './econsult.component.html',
  styleUrl: './econsult.component.scss'
})
export class EconsultComponent implements OnInit{
  Consultants?: Econsult[];

  constructor (
    private _econsultService: EconsultService
  ) {}


  ngOnInit(): void {
      this._econsultService.getTeamMembers({
        query: {
          filter: {}
        }
      }).subscribe((response: any) => {
        console.log(response);
        this.Consultants = response.SQResponse.team_members;

        console.log(this.Consultants);
      });
  }

}
