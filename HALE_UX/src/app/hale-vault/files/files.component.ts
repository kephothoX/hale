import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { FormBuilder, Validators } from '@angular/forms';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import {  MatTable } from '@angular/material/table';
import {  MatPaginator } from '@angular/material/paginator';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {  MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FileService } from '../file.service';
import { Files, File } from '../files';

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrl: './files.component.scss'
})
export class FilesComponent implements OnInit {
  Files: Files[] = [];
  displayedColumns: string[] = ['name', 'folder', 'created_at', 'updated_at', 'id'];
  clickedRows = new Set<Files[]>();
  columnsToDisplay: string[] = new Array();

  

  pageLength: number = 15;
  pageSize: number = 20;
  pageSizeOptions: number[] = [15, 30, 60, 120, 240, 480, 960];

  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatTable) table?: MatTable<Files>;
  @ViewChild(MatSort) sort?: MatSort;

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.columnsToDisplay, event.previousIndex, event.currentIndex )
  }


  constructor (
      private _formBuilder: FormBuilder,
      public _matDialog: MatDialog,
      private _fileService: FileService
  ) {}

  ngOnInit(): void {
      this._fileService.getFiles({ filter: {}}).subscribe((response: any) => {
        console.log(response);

        this.Files = response.result.objects;
      });


     for(let column of this.displayedColumns) {
      this.columnsToDisplay.push(column);
    }
  }

  openFileDialog(file_id: String) {
    const dialogRef = this._matDialog.open(OpenFileDialog, { data: {
      FileId: file_id
    }});

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

   

  openShareFileDialog(file_id: String) {
    const dialogRef = this._matDialog.open(ShareFileDialog, { data: {
      FileId: file_id
    }});

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }




  removeColumn() {
    if (this.columnsToDisplay.length) {
      this.columnsToDisplay.pop();
    }
  }


  filesFilterForm = this._formBuilder.group({
    name: [''],
    created_at: [''],
    updated_at: ['']
  });


  ngOnSubmit() {
    const filterFields = this.filesFilterForm.value;

    this._fileService.getFiles({
      filter: {}
    }).subscribe((response: any) => {
      
      this.Files = response.result.objects;

      console.log(this.Files)
    })

  }

  resetForm () {
    this.filesFilterForm.reset();
  }

}

@Component({
  selector: 'open-file-dialog',
  templateUrl: './open-file.html',
})
export class OpenFileDialog implements OnInit {
  File?: File;
  FileURL: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public Data: _File,
    private _formBuilder: FormBuilder,
    private _fileService: FileService,
    private _domSanitizer: DomSanitizer,
    public _matSnackbar: MatSnackBar
  ) { }

  ngOnInit(): void{
    console.log(this.Data.FileId );
  }

  filePasswordForm = this._formBuilder.group({
    password: ['']
  });

  ngOnSubmit(): void{
    this._fileService.getFile({
      id:this.Data.FileId,
      transfer_method: "dest-url",
      password: this.filePasswordForm.value.password
    }).subscribe((response: any) => {
      console.log(response);
      
      if(response.status == 'Success') {
        this.File = response.result;

        console.log(this.File);
        this.FileURL =  this._domSanitizer.bypassSecurityTrustResourceUrl(response.result.dest_url);

      } else {
        this._matSnackbar.open(`${ response.summary }`, 'Dismiss');
      }
    })

  }

  resetForm(): void{
    this.filePasswordForm.reset()
  }

  removePasswordForm = this._formBuilder.group({
    password: ['', Validators.required]
  });

  ngOnRemovePassword(): void{
    this._fileService.updateFile({
      id: this.Data.FileId,
      remove_password: this.removePasswordForm.value.password
    }).subscribe((response: any) => {
      this._matSnackbar.open(`${ JSON.stringify(response)}`, 'Dismiss')
    });
  }

  addPasswordForm = this._formBuilder.group({
    password: ['', Validators.required]
  });

  ngOnAddPassword(): void{
    this._fileService.updateFile({
      id: this.Data.FileId,
      add_password: this.addPasswordForm.value.password,
      add_password_algorithm: 'AES-CFB-256'
    }).subscribe((response: any) => {
      this._matSnackbar.open(`${ JSON.stringify(response)}`, 'Dismiss')
    });
  }

  changeFilenameForm = this._formBuilder.group({
    name: ['', Validators.required]
  });

  ngOnChangeFilename(): void{
    this._fileService.updateFile({
      id: this.Data.FileId,
      name: this.changeFilenameForm.value.name,
    }).subscribe((response: any) => {
      this._matSnackbar.open(`${ JSON.stringify(response)}`, 'Dismiss')
    });
  }

  
}



@Component({
  selector: 'share-file-dialog',
  templateUrl: './share-file.html',
})
export class ShareFileDialog implements OnInit {
  LinkType: String[] = ['upload', 'download', 'editor']
  File?: File;
  FileURL: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public Data: _File,
    private _formBuilder: FormBuilder,
    private _fileService: FileService,
    private _domSanitizer: DomSanitizer,
    public _matSnackbar: MatSnackBar
  ) { }

  ngOnInit(): void{
    console.log(this.Data.FileId );
  }

 

  shareFileForm = this._formBuilder.group({
    title: ['', Validators.required],
    message: ['', Validators.required],
    max_access_count: ['', Validators.required],
    expires_at: ['', Validators.required],
    link_type: ['', Validators.required]

  });


  ngShareFileSubmit(): void{

    const dataset = {
      auth_type: 'email_otp',
      auth_context: `${window.sessionStorage.getItem('email_address')}`,

      targets: [this.Data.FileId],
      link_type: this.shareFileForm.value.link_type,
      expires_at: new Date(`${this.shareFileForm.value.expires_at}`).toISOString(),
      max_access_count: this.shareFileForm.value.max_access_count,
      title: this.shareFileForm.value.title,
      message: this.shareFileForm.value.message,
      notify_email: window.sessionStorage.getItem('email_address'),
      tags: ['Shared File ', `${new Date().toISOString()}`]

    }

    console.log(dataset)

    this._fileService.newSharedFile(dataset).subscribe((response: any) => {
      console.log(response);
    });
  }

  resetForm(): void {
    this.shareFileForm.reset();
  }

  
}




export interface _File {
  FileId: String;
}

