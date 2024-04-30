import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMenuModule } from '@angular/material/menu';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { DragDropModule} from '@angular/cdk/drag-drop';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';

import { PaymentsRoutingModule } from './payments-routing.module';
import { PaymentsComponent } from './payments.component';

import { InvoicesComponent } from './invoices/invoices.component';
import { MatTableModule } from '@angular/material/table';


@NgModule({
  declarations: [
    PaymentsComponent,
    InvoicesComponent
  ],
  imports: [
    CommonModule,
    PaymentsRoutingModule,
     ReactiveFormsModule,
    
    MatGridListModule,
    MatListModule,
    MatCardModule,
    MatTabsModule,
    MatButtonModule,
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatSnackBarModule,
    MatExpansionModule,
    MatToolbarModule,
    MatDialogModule,
    MatSelectModule,
    MatMenuModule,
    MatStepperModule,
    MatDividerModule,
    DragDropModule,
    OverlayModule,
    MatProgressBarModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule
  ]
})
export class PaymentsModule { }
