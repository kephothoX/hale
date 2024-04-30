import { NgModule } from '@angular/core';
import { RouterModule, Routes, provideRouter } from '@angular/router';
import { HaleVaultComponent } from './hale-vault.component';

import { FilesComponent } from './files/files.component';
import { UploadComponent } from './upload/upload.component';
import { FileSharingComponent } from './file-sharing/file-sharing.component';

const routes: Routes = [
  { path: '', title: 'Hale Vault', component: HaleVaultComponent },
  { path: 'files', title: 'My Files', component: FilesComponent },
  { path: 'upload', title: 'Upload File', component: UploadComponent },
  { path: 'file-sharing', title: 'File Sharing', component: FileSharingComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [provideRouter(routes)]
})
export class HaleVaultRoutingModule { }
