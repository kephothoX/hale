import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatRadioModule } from '@angular/material/radio';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS, MAT_DIALOG_SCROLL_STRATEGY } from '@angular/material/dialog';
import { DragDropModule} from '@angular/cdk/drag-drop';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { HaleVaultRoutingModule } from './hale-vault-routing.module';
import { HaleVaultComponent } from './hale-vault.component';

import { FilesComponent, OpenFileDialog, ShareFileDialog } from './files/files.component';
import { UploadComponent } from './upload/upload.component';
import { FileSharingComponent, ViewFileDialog, ShareManyDialog, DelManyDialog, ShareLinkDialog } from './file-sharing/file-sharing.component';
import { ScrollStrategyOptions } from '@angular/cdk/overlay';


@NgModule({
  declarations: [
    HaleVaultComponent,
    FilesComponent,
    UploadComponent,
    OpenFileDialog,
    ShareFileDialog,
    ViewFileDialog,
    FileSharingComponent,
    ShareManyDialog,
    DelManyDialog,
    ShareLinkDialog

  ],
  imports: [
    CommonModule,
    HaleVaultRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,

    MatCardModule,
    MatRadioModule,
    MatDividerModule,
    MatIconModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatSnackBarModule,
    MatCheckboxModule,
    MatSelectModule,
    MatProgressBarModule,
    MatDialogModule,
    MatTabsModule,
    MatPaginatorModule,
    MatSortModule,
    DragDropModule,
    MatTableModule
    
    
  ],
  providers: [
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: false } }
  ]
})
export class HaleVaultModule { }
