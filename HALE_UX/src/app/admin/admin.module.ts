import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
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

import { NewLocationComponent } from './locations/new-location/new-location.component';
import { EditLocationComponent } from './locations/edit-location/edit-location.component';

import { NewSubscriptionComponent } from './subscriptions/new-subscription/new-subscription.component';
import { EditSubscriptionComponent } from './subscriptions/edit-subscription/edit-subscription.component';
import { ListComponent } from './subscriptions/list/list.component';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';


@NgModule({
  declarations: [
    AdminComponent,
    NewLocationComponent,
    EditLocationComponent,
    NewSubscriptionComponent,
    ListComponent,
    EditSubscriptionComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    HttpClientModule,
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
  ]
})
export class AdminModule { }
