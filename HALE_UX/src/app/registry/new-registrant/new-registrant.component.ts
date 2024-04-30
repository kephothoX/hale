import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-new-registrant',

  templateUrl: './new-registrant.component.html',
  styleUrl: './new-registrant.component.scss'
})
export class NewRegistrantComponent {

  constructor (
    private _formBuilder: FormBuilder,
    public _matsnackBar: MatSnackBar
  ) {}


  newRegistrantForm = this._formBuilder.group({
    registration_date: ['', Validators.required],
    registration_number: ['', Validators.required],
    qualifications: ['', Validators.required],
    speciality: ['', Validators.required],
    sub_speciality: ['', Validators.required],
    practice_type: ['', Validators.required],
    license_type: ['', Validators.required],
    license_number: ['', Validators.required],
    practice_location: ['', Validators.required],
  })




  ngOnSubmit() {
      const formValues = this.newRegistrantForm.value;

    const registrantDataset = {
      email: window.sessionStorage.getItem('email_address'),
      identity: window.sessionStorage.getItem('identity'),
      registration_date: formValues.registration_date,
      registration_number: formValues.registration_number,
      qualifications: formValues.qualifications,
      speciality: formValues.speciality,
      sub_speciality: formValues.sub_speciality,
      practice_type: formValues.practice_type,
      license_type: formValues.license_type,
      license_number: formValues.license_number,
      practice_location: formValues.practice_location
      }

  }

  resetForm(): void{
    this.newRegistrantForm.reset();
  }

}
