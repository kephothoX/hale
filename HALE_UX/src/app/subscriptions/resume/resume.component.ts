import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { Subscription } from '../subscription';
import { AuthService } from '../../auth/auth.service';

import { SubscriptionsService } from '../subscriptions.service';

import * as moment from 'moment';

@Component({
  selector: 'app-resume-subscription',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.scss']
})
export class ResumeComponent implements OnInit {
  ChangeTiming: string[] = ['IMMEDIATE', 'END_OF_BILLING_CYCLE'];

  subscription?: Subscription;

  constructor (
    private _subscriptionsService: SubscriptionsService,
    private _authService: AuthService,
    private _formBuilder: FormBuilder,
    private _router: Router,
    public _matSnackBar: MatSnackBar
  ) {}

  ngOnInit() {
    if(window.sessionStorage.getItem('active_subscription_id')) {
      this._subscriptionsService.getSubscriptionById( { id: window.sessionStorage.getItem('active_subscription_id')}).subscribe((result: any) => {
        this.subscription = result.subscription;

      });
    } else {
      this._matSnackBar.open('You have no Active Subscriptions. Subscribe to Continue..', 'Dismiss');

      setTimeout(() => {
        this._authService.auditLog({
          message: `${window.sessionStorage.getItem('email_address')} Resumed Subscription`
        }).subscribe((result: any) => {
          this._matSnackBar.open(`${result.summary}`, 'Dismiss');
        });
        this._router.navigate(['/home']);
      }, 1000);

    }
  }


  resumeSubscriptionForm = this._formBuilder.group({
    resume_change_timing: ['', Validators.required],
    resume_effective_date: ['', Validators.required]
  });

  ngOnSubmit() {
    const formValues = this.resumeSubscriptionForm.value;

    const dataSet = {
      subscription_id: window.sessionStorage.getItem('active_subscription_id'),
      dataSet: {
        resume_change_timing: formValues.resume_change_timing,
        resume_effective_date: this.formatDate(formValues.resume_effective_date)
      }
    }

    this._subscriptionsService.resumeSubscription(dataSet).subscribe((result: any) => {
      this._matSnackBar.open('Subscription Resumed Successfully...', 'Dismiss');
      this._router.navigate(['/subscriptions/my-invoices']);
    })

  }

  formatDate(date: any) {
    return moment(date).format('YYYY-MM-DD');
  }


}
