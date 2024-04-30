import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatMenuModule } from '@angular/material/menu';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { DragDropModule} from '@angular/cdk/drag-drop';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';

import { SubscriptionsRoutingModule } from './subscriptions-routing.module';
import { SubscriptionsComponent } from './subscriptions.component';
import { CancelComponent } from './cancel/cancel.component';
import { PauseComponent } from './pause/pause.component';
import { ResumeComponent } from './resume/resume.component';
import { UpgradeComponent } from './upgrade/upgrade.component';



@NgModule({
  declarations: [
    SubscriptionsComponent,
    CancelComponent,
    PauseComponent,
    ResumeComponent,
    UpgradeComponent
  ],
  imports: [
    CommonModule,
    SubscriptionsRoutingModule,
    ReactiveFormsModule,

    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatListModule,
    MatDividerModule,
    MatDialogModule,
    MatSnackBarModule,
    MatMenuModule,
    MatFormFieldModule,
    MatStepperModule,
    MatInputModule,
    MatExpansionModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    DragDropModule,
    MatTableModule,
    MatProgressSpinnerModule,
  ]
})
export class SubscriptionsModule { }
