import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { SelectionModel } from '@angular/cdk/collections';
import { FormBuilder, Validators } from '@angular/forms';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import {  MatTable, MatTableDataSource } from '@angular/material/table';
import {  MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {  MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { File } from '../files'
import { FileService } from '../file.service';
import { FileSharing } from '../file-sharing';
@Component({
  selector: 'app-file-sharing',
  templateUrl: './file-sharing.component.html',
  styleUrl: './file-sharing.component.scss'
})
export class FileSharingComponent implements OnInit {
  row: any;
  Shared?: FileSharing[];
  displayedColumns: string[] = ['select', 'title', 'access_count', 'expires_at', 'link_type', 'link', 'actions'];
  clickedRows = new Set<FileSharing[]>();
  columnsToDisplay: string[] = new Array(); 
  dataSource = new MatTableDataSource<FileSharing>(this.Shared);
  HostedAuthNLink: any = this._domSanitizer.bypassSecurityTrustResourceUrl(`https://pdn-2snolcdqeqwjygvwfl54i2wunbu5klxv.login.gcp.us.pangea.cloud/authorize?state=xxxxxxxxxxxxx&redirect_uri=https%3A%2F%2Fhttps://localhost:4201/auth/signin`);
  filesToShare: any;

  sharableLinks = new Array();

  pageLength: number = 15;
  pageSize: number = 20;
  pageSizeOptions: number[] = [15, 30, 60, 120, 240, 480, 960];

  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatTable) table?: MatTable<FileSharing[]>;
  @ViewChild(MatSort) sort?: MatSort;

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.columnsToDisplay, event.previousIndex, event.currentIndex )
  }

  selection = new SelectionModel<FileSharing>(true, []);

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }


  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  checkboxLabel(row?: FileSharing): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row `;
  }



 constructor (
  private _fileService: FileService,
  private _router: Router,
  private _domSanitizer: DomSanitizer,
  public _matDialog: MatDialog,
  public _matSnackBar: MatSnackBar
 ) {}

 ngOnInit(): void {
  this._fileService.getSharedFiles({ filter: {notify_email: window.sessionStorage.getItem('email_address')}}).subscribe((response: any) => {
    console.log(response);

    if (response.status == 'Success') {
      this.Shared = response.result.share_link_objects;
      console.log(this.Shared);
    } else {
      this._matSnackBar.open(`${ JSON.stringify(response.summary)}`, 'Dismiss');

      this._router.navigate(['/vault/upload']);
    }
  });

   for(let column of this.displayedColumns) {
      this.columnsToDisplay.push(column);
    }
    
 }

 getShareIds(id: any) {
  let fileIds = new Array();
  fileIds.push(id);

  console.log('Files to Share: ', fileIds);
  console.log(fileIds.length);
  this.filesToShare = fileIds;

  console.log(this.filesToShare);

  
 }

 addSharableLinks(id: String): void {
    this.sharableLinks.push(id);

    console.log(this.sharableLinks);
  }

  removeSharableLinks() {
    this._fileService.removeSharableLink({
      ids: this.sharableLinks
    }).subscribe((response: any) => {
      this._matSnackBar.open(`${ JSON.stringify(response)}`, 'Dismiss')
    });
  }


 
  viewFileDialog(file_id: String) {
    const dialogRef = this._matDialog.open(ViewFileDialog, { data: {
      FileId: file_id
    }});

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

 sendLinkDialog(file_link: String) {
    const dialogRef = this._matDialog.open(ShareLinkDialog, { data: {
      FileLink: file_link
    }});

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }


  shareManyDialog() {
    const dialogRef = this._matDialog.open(ShareManyDialog, { data: {
      FileLinks: this.sharableLinks
    }});

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  delManyDialog() {
    const dialogRef = this._matDialog.open(DelManyDialog, { data: {
      FileLinks: this.sharableLinks
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


  /*filesFilterForm = this._formBuilder.group({
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
  }*/

}



@Component({
  selector: 'view-file-dialog',
  templateUrl: './view-file.html',
})
export class ViewFileDialog implements OnInit {
  File?: File;
  FileURL: any;
  sharableLinks = new Array();

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

  shareFileForm = this._formBuilder.group({
    email_address: ['', Validators.required]
  });


  ngShareFileSubmit(): void{

    const dataset = {
      sender_email: window.sessionStorage.getItem('email_address'),
      links: [
        {
          email: this.shareFileForm.value.email_address,
          id: this.Data.FileId 
        }
      ]
    }

    this._fileService.sendFileSharableLink(dataset).subscribe((response: any) => {
      console.log(response);
    });
  }

  resetShareFileForm(): void {
    this.shareFileForm.reset();
  }

  

  
}

@Component({
  selector: 'share-many-dialog',
  templateUrl: './share-many.html',
})
export class ShareManyDialog { 
  LinkType: String[] = ['upload', 'download', 'editor']
  constructor(
    @Inject(MAT_DIALOG_DATA) public Data: Sharables,
    private _formBuilder: FormBuilder,
    private _fileService: FileService,
    public _matSnackBar: MatSnackBar
  ) {}


   sendLinksForm = this._formBuilder.group({
      email:  ['', Validators.required]
   });


  ngSendLinks(): void{

    
    this._fileService.sendFileSharableLink({
      links: this.Data.FileLinks,
      email: this.sendLinksForm.value.email,
      sender_email: window.sessionStorage.getItem('email_address')
    }).subscribe((response: any) => {
      this._matSnackBar.open(`${ JSON.stringify(response)}`, 'Dismiss')
    });
  }

}

@Component({
  selector: 'del-many-dialog',
  templateUrl: './del-many.html',
})
export class DelManyDialog {
   constructor(
    @Inject(MAT_DIALOG_DATA) public Data: Sharables,
    private _formBuilder: FormBuilder,
    private _fileService: FileService,
    public _matSnackBar: MatSnackBar
  ) {}

  
  DelSharableLinks(): void{
    this._fileService.removeSharableLink({ ids: this.Data.FileLinks }).subscribe((response: any) => {
      this._matSnackBar.open(`${ JSON.stringify(response )}`, 'Dismiss');
    })
  }

 }



@Component({
  selector: 'share-file-dialog',
  templateUrl: './send-link.html',
})
export class ShareLinkDialog implements OnInit {
  LinkType: String[] = ['upload', 'download', 'editor']
  File?: File;
  FileURL: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public Data: Sharable,
    private _formBuilder: FormBuilder,
    private _fileService: FileService,
    public _matSnackBar: MatSnackBar
  ) { }

  ngOnInit(): void{

  }
 

  sendLinkForm = this._formBuilder.group({
      email:  ['', Validators.required]
   });


  ngSendLink(): void{

    
    this._fileService.sendFileSharableLink({
      links: this.Data.FileLink,
      email: this.sendLinkForm.value.email,
      sender_email: window.sessionStorage.getItem('email_address')
    }).subscribe((response: any) => {
      this._matSnackBar.open(`${ JSON.stringify(response)}`, 'Dismiss')
    });
  }

  
}




export interface _File {
  FileId: String;
}

export interface Sharable {
  FileLink: String;
}

export interface Sharables {
  FileLinks: String[];
}


