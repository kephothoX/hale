import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { SubscriptionsService } from '../subscriptions.service';
import { AuthService } from '../../auth/auth.service';

import * as moment from 'moment';

@Component({
  selector: 'app-pause-subscription',
  templateUrl: './pause.component.html',
  styleUrls: ['./pause.component.scss']
})
export class PauseComponent implements OnInit {
  ChangeTiming: string[] = ['IMMEDIATE', 'END_OF_BILLING_CYCLE'];

  constructor (
    private _subscriptionsService: SubscriptionsService,
    private _authService: AuthService,
    private _formBuilder: FormBuilder,
    private _router: Router,
    public _matSnackBar: MatSnackBar
  ) {}

  ngOnInit() {
    if(window.sessionStorage.getItem('active_subscription_id')) {
      return;
    } else {
      this._matSnackBar.open('You have no Active Subscriptions. Subscribe to Continue..', 'Dismiss');

      setTimeout(() => {
        this._router.navigate(['/home']);
      });

    }
  }

  pauseSubscriptionForm = this._formBuilder.group({
    //pause_cycle_duration: ['', Validators.required ],
    pause_effective_date: ['', Validators.required ],
    pause_reason: ['', Validators.required ],
    resume_change_timing: ['', Validators.required ],
    resume_effective_date: ['', Validators.required ],
  });


  ngOnSubmit() {
    const formValues = this.pauseSubscriptionForm.value;

    const dataSet = {
      subscription_id: window.sessionStorage.getItem('active_subscription_id'),
      dataSet: {
        resume_change_timing: formValues.resume_change_timing,
        pause_reason: formValues.pause_reason,
       // pause_cycle_duration: formValues.pause_cycle_duration,
        pause_effective_date: this.formatDate(formValues.pause_effective_date),
        resume_effective_date: this.formatDate(formValues.resume_effective_date),
      }
    }

    this._subscriptionsService.pauseSubscription(dataSet).subscribe((result: any) => {
      this._matSnackBar.open('Subscription Paused...', 'Dismiss');

      setTimeout(() => {
        this._authService.auditLog({
              message: `${window.sessionStorage.getItem('email_address')} Paused Subscription`
            }).subscribe((result: any) => {
              this._matSnackBar.open(`${result.summary}`, 'Dismiss');
            });
        this._router.navigate(['/home']);
      });

    });

  }

  formatDate(date: any) {
    return moment(date).format('YYYY-MM-DD');
  }

}
