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
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';

import { CheckoutRoutingModule } from './checkout-routing.module';
import { CheckoutComponent } from './checkout.component';

import { NewCardComponent } from './new-card/new-card.component';
import { CardsComponent } from './cards/cards.component';
import { PaymentsComponent } from './payments/payments.component';


import { GooglePayComponent } from './google-pay/google-pay.component';
import { CardPayComponent } from './card-pay/card-pay.component';
import { AchPayComponent } from './ach-pay/ach-pay.component';

@NgModule({
  declarations: [
    CheckoutComponent,
    NewCardComponent,
    CardsComponent,
    PaymentsComponent
    
  ],
  imports: [
    GooglePayComponent,
    CardPayComponent,
    AchPayComponent,


    CommonModule,
    CheckoutRoutingModule,
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
    MatProgressBarModule,
  ]
})
export class CheckoutModule { }
