import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';


import { AuthService } from '../../auth/auth.service'

import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent implements OnInit, AfterViewInit {
  visibility: string = 'hidden';
  disable_next: boolean = true;
  duration: string = '2000';
  email_address: string = '';

  constructor(
    private _formBuilder: FormBuilder,
    private _authService: AuthService,
    private _router: Router,
    public _matSnackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    const timeline: string | null = window.sessionStorage.getItem('user_active_token_expire');
    const active_date = new Date().toISOString();
    if(timeline) {
      if(active_date > timeline) {
      window.sessionStorage.setItem('auth_login_status', 'false');
      window.location.reload();
    } else {
      setTimeout(() => {
        window.sessionStorage.setItem('auth_login_status', 'true');
        this._router.navigate(['/home']);
      });
    }
    }

  }

  ngAfterViewInit() {
    let element = document.getElementById('googleSignInBtn');

    if (element) {
      // @ts-ignore
      google.accounts.id.initialize({
        client_id: '630879666344-14rl98ful5m0ln3vvivhc5ffa8r2seu7.apps.googleusercontent.com',
        callback: this.googleSignInResponse.bind(this),
        auto_select: false,
        cancel_on_tap_outside: true,

      });
      // @ts-ignore
      google.accounts.id.renderButton(
        // @ts-ignore
        document.getElementById('googleSignInBtn'),
        { width: 'auto', type: "standard", shape: "pill", theme: "outline", text: "signin_with", size: "large" }
      );
      // @ts-ignore
      google.accounts.id.prompt((notification: PromptMomentNotification) => { });
    }
  }

  async googleSignInResponse(response: any) {

    console.log(response);
  }


  passwordResetForm = this._formBuilder.group({
    email: ['', Validators.required],
    old_password: ['',
      [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20),
      ]
    ],
    new_password: ['',
      [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20),
      ]
    ]
  });

 
  async ngOnSubmit() {
    const formValues = this.passwordResetForm.value;
    const email: string = this.passwordResetForm.value.email ? this.passwordResetForm.value.email: '';
    this.email_address = email;

    return this._authService.authFlowStart({ email:  formValues.email }).subscribe((result: any) => {

      window.sessionStorage.setItem('flowID', `${ result.result.flow_id}`);

     
    });
  }

}

