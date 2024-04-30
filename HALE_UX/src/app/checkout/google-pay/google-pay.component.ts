import { Component } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-google-pay',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatCardModule
  ],
  templateUrl: './google-pay.component.html',
  styleUrl: './google-pay.component.scss'
})
export class GooglePayComponent {

}
