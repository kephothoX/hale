import { Component } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-pay-request',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatCardModule
  ],
  templateUrl: './pay-request.component.html',
  styleUrl: './pay-request.component.scss'
})
export class PayRequestComponent {

}
