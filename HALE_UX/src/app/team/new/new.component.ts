import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { TeamService } from '../team.service';
import { LocationsService } from 'src/app/locations/locations.service';
import { Location } from 'src/app/locations/location';

import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'app-team-new',
  templateUrl: './new.component.html',
  styleUrl: './new.component.scss'
})
export class NewComponent implements OnInit {
  Locations: Location[] = [];

  constructor (
    private _formBuilder: FormBuilder,
    private _teamService: TeamService,
    private _locationsService: LocationsService,
    public _matSnackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this._locationsService.listLocations().subscribe((results: any) => {
      this.Locations = results.SQResponse.locations;
      console.log('Locations: ', this.Locations);
    });
  }


  newTeamMemberForm = this._formBuilder.group({
    location_ids: ['', Validators.required],
    email_address: ['', Validators.required],
    given_name: ['', Validators.required],
    family_name: ['', Validators.required],
    reference_id: ['', Validators.required],
    phone_number: ['', Validators.required]
  });



  ngSubmitTeamMemberForm(): void {
    const dataset = {
      team_member: {
        assigned_locations: {
          location_ids: this.newTeamMemberForm.value.location_ids,
          assignment_type: 'EXPLICIT_LOCATIONS'
        },
        reference_id: this.newTeamMemberForm.value.reference_id,
        status: 'ACTIVE',
        phone_number: this.newTeamMemberForm.value.phone_number,
        given_name: this.newTeamMemberForm.value.given_name,
        family_name: this.newTeamMemberForm.value.family_name,
        email_address: this.newTeamMemberForm.value.email_address
      },
      idempotency_key: window.crypto.randomUUID()
    }

    console.log(dataset);

    this._teamService.newTeamMember(dataset).subscribe((response: any) => {
      console.log(response);
    })


  }

  resetForm(): void {
    this.newTeamMemberForm.reset();
  }

}


/*


  */