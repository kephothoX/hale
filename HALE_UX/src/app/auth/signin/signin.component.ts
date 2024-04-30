import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { DomSanitizer } from '@angular/platform-browser'

import { AuthFlow } from '../auth-flow';
import { AuthService } from '../auth.service'

import { MatSnackBar } from '@angular/material/snack-bar';
import { isEmpty } from 'rxjs';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],

})
export class SigninComponent implements OnInit {
  AuthLink = this._domSanitizer.bypassSecurityTrustResourceUrl('https://pdn-2snolcdqeqwjygvwfl54i2wunbu5klxv.login.gcp.us.pangea.cloud/authorize?state=xxxxxxxxxxxxx');
  ActiveSession: any = window.sessionStorage.getItem('active_session');
  SocialLogin?: any;
  PasswordLogin?: any;
  AuthFlow?: any;
  SocialLoginURI: any;
  visibility: string = 'hidden';
  disable_next: boolean = true;
  duration: string = '2000';
  email_address: string = '';

  constructor(
    private _formBuilder: FormBuilder,
    private _authService: AuthService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _domSanitizer: DomSanitizer,
    public _matSnackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    if(this.ActiveSession  == 'true')  {
      this._router.navigate(['/home']);
    }

    //


    /*const timeline: string | null = window.sessionStorage.getItem('user_active_token_expire');
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
    }*/
  }

  emailForm = this._formBuilder.group({
    email_address: ['', Validators.required],
  })


  passwordForm = this._formBuilder.group({
    password: ['',
      [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20),
      ]
    ]
  });

  ngAuthFlowStart() {

    this._authService.getSquareCustomer({ email: this.emailForm.value.email_address }).subscribe((response) => {
      console.log(response);
      
      if (response.SQResponse.customers == undefined || response.SQResponse.customers.length <= 0) {
        this._router.navigate(['/auth/signup'])
      } else {
        window.sessionStorage.setItem('SQ_User', `${JSON.stringify(response.SQResponse.customers[0])}`);

        window.sessionStorage.setItem('email_address', `${response.SQResponse.customers[0].email_address}`);
        window.sessionStorage.setItem('given_name', `${response.SQResponse.customers[0].given_name}`);
        window.sessionStorage.setItem('family_name', `${response.SQResponse.customers[0].family_name}`);
        window.sessionStorage.setItem('SQ_User_ID', `${response.SQResponse.customers[0].id}`);
        this._matSnackBar.open(`Welcome back, ${response.SQResponse.customers[0].given_name}`, 'Dismiss');

        /*
        this._authService.getUserSessions({ email: response.SQResponse.customers[0].email_address }).subscribe((sessResponse) => {
          console.log(sessResponse);

          if (sessResponse.status == 'Success' && sessResponse.result.count != 0) {
            window.sessionStorage.setItem('ActiveSessions', `${JSON.stringify(sessResponse.result.sessions)}`);
            window.sessionStorage.setItem('active_session', 'true');
            window.sessionStorage.setItem('identity', `${ (sessResponse.result.sessions[(sessResponse.result.sessions.length) - 1]).identity }`);
            window.sessionStorage.setItem('session_id', `${ (sessResponse.result.sessions[(sessResponse.result.sessions.length) - 1]).id }`);


            const expiry_date = new Date((sessResponse.result.sessions[(sessResponse.result.sessions.length) - 1]).expire).toISOString();
            const now = new Date().toISOString();

            if (expiry_date < now) {
              this._matSnackBar.open('Session Expired.', 'Dismiss');

              window.sessionStorage.setItem('active_session', 'false');

              this._authService.authFlowStart({ email: this.emailForm.value.email_address }).subscribe((response: any) => {
                console.log(response);
                window.sessionStorage.setItem('authFlow', `${JSON.stringify(response.result)}`);
                this.AuthFlow = response.result;

                for (let i of this.AuthFlow.flow_choices) {
                  console.log(i);

                  if (i['choice'] == 'social') {
                    this.SocialLogin = i['choice'];
                    this.SocialLoginURI = i['data']['redirect_uri'];

                    console.log(this.SocialLogin);
                    console.log(this.SocialLoginURI);

                  }

                  if (i['choice'] == 'password') {
                    this.PasswordLogin = i['choice'];
                  }
                }
              });

            } else {

              this._router.navigate(['/home']);
            }

          } else {

            window.location.href = 'https://pdn-2snolcdqeqwjygvwfl54i2wunbu5klxv.login.gcp.us.pangea.cloud/authorize?state=xxxxxxxxxxxxx';

            /*
            this._authService.authFlowStart({ email: this.emailForm.value.email_address }).subscribe((response: any) => {
              console.log(response);
              window.sessionStorage.setItem('authFlow', `${JSON.stringify(response.result)}`);
              this.AuthFlow = response.result;

              for (let i of this.AuthFlow.flow_choices) {
                if (i['choice'] == 'social') {
                  this.SocialLogin = i['choice'];
                  this.SocialLoginURI = i['data']['redirect_uri'];

                  console.log(this.SocialLogin);
                  console.log(this.SocialLoginURI);

                }

                if (i['choice'] == 'password') {
                  this.PasswordLogin = i['choice'];
                }
              }
            });
            
          }
        }); 

        */

      }
    })
  }


  ngPasswordSubmit() {
    const dataSet = {
      email: this.emailForm.value.email_address,
      password: this.passwordForm.value.password,
    }

    this._authService.loginWithPassword(dataSet).subscribe((result: any) => {
      this._matSnackBar.open(`${result.summary}`, 'Dismiss');
      if (result.status == 'Success') {

        setTimeout(() => {
          this._authService.getuserByEmailAddress(`${result.result.active_token.email}`).subscribe((result: any) => {
            window.sessionStorage.setItem('customer_id', result.customers[0].id);
          });
        });

        window.sessionStorage.setItem('auth_login_status', 'true');
        window.sessionStorage.setItem('user_active_token', `${result.result.active_token.token}`);
        window.sessionStorage.setItem('user_active_token_identity', `${result.result.active_token.id}`);
        window.sessionStorage.setItem('user_active_token_id', `${result.result.active_token.id}`);
        window.sessionStorage.setItem('user_active_token_expire', `${result.result.active_token.expire}`);
        window.sessionStorage.setItem('user_active_token_first_name', `${result.result.active_token.profile.first_name}`);
        window.sessionStorage.setItem('user_active_token_last_name', `${result.result.active_token.profile.last_name}`);
        window.sessionStorage.setItem('user_active_token_phone', `${result.result.active_token.profile.phone}`);
        window.sessionStorage.setItem('customer_email_address', `${result.result.active_token.email}`);
        this._router.navigate(['/home']);
      }

      if (result.status == 'InvalidFlowState') {
        this._matSnackBar.open('Invalid Flow State', 'Dismiss');
        window.location.reload();
      }
    });
  }

  signupWithPassword() {
    this._authService.authFlowUpdate({
      choice: "password",
      flow_id: `${window.sessionStorage.getItem('flowID')}`,
      data: {
        password: this.passwordForm.value.password
      }
    }).subscribe((response) => {
      console.log(response);

    });


  }

  signupWithGoogle() {
    window.location.href = this.SocialLoginURI;
  }



  resetEmailForm() {
    this.emailForm.reset();
  }

  resetPasswordForm() {
    this.passwordForm.reset();
  }

}
