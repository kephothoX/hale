import { Component } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';

import { MatSnackBar } from '@angular/material/snack-bar';

import { FileService } from '../file.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.scss'
})
export class UploadComponent {
  Show_Password_Field: String = 'none';
  Protect_With_Password: String[] = ['Yes', 'No'];
  formData: any = new FormData();
  


  constructor(
    private _formBuilder: FormBuilder,
    private _fileService: FileService,
    private _matSnackBar: MatSnackBar
  ) { }


  ngOnInit() {

  }

  newFolderForm = this._formBuilder.group({
    path: ['', Validators.required]
  });

  newFolderSubmit() {
    this._fileService.newFolder({
      metadata: {
            created_by: window.sessionStorage.getItem('user'),
            priority: "medium"
        },
        path:`/${ this.newFolderForm.value.path }/`
      }).subscribe((response: any) => {
        console.log(response)
      })

  }


  newFileUploadForm = this._formBuilder.group({
    name: ['', Validators.required],
    password: ['']
  });

  ngOnSubmit() {
    const formValues = this.newFileUploadForm.value;

    this.formData.append('name', formValues.name);
    this.formData.append('password', formValues.password);
    this.formData.append('created_by', 'kephotho');


    this._fileService.uploadFile(this.formData).subscribe((result: any) => {
      this._matSnackBar.open(result.response, 'Dismiss');
      /*setTimeout(() => {
        this.resetForm();
        window.location.reload();
      });*/
    });

  }

  resetForm() {
    this.newFileUploadForm.reset();
  }

  onFileChange(event: any) {
    if (event.target.files && event.target.files.length) {
      this.formData.append('_file', event.target.files[0]);
      this.formData.append('_file_name', `${event.target.files[0].name}`);
    }
  }

  showPasswordField(event: any) {
    if (event.target.value == 'Yes') {
      this.Show_Password_Field = 'inherit';
    } else {
      this.Show_Password_Field = 'none';
    }
  }

}
