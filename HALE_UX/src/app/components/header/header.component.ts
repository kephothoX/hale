import { Component } from '@angular/core';
;
import { MatSnackBar  } from '@angular/material/snack-bar';

import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
    title?: string;

  accountEmail?: any;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _authService: AuthService,
    private _router: Router,
    public _matSnackBar: MatSnackBar,
  ) {  }

  ngOnInit() {
    this.title = this._activatedRoute.snapshot.routeConfig?.title?.toString();
    this.accountEmail = window.sessionStorage.getItem('email_address');
    console.log(this.accountEmail);
  }


  isMyEmailCompromised() {
    this._authService.checkEmailBreach({
      email: this.accountEmail
    }).subscribe((result: any) => {
      if(result.result.data.found_in_breach == false) {
        this._matSnackBar.open('Your Email is secure.', 'Dismiss')
      }

       if(result.result.data.found_in_breach == true) {
        this._matSnackBar.open('Your Email is Compromised.', 'Dismiss')
      }

    });
  }

  logOutUser() {
    this._authService.logoutUser({
      user_id: window.sessionStorage.getItem('identity')
    }).subscribe((result: any) => {
      if (result.status == 'Success') {
        this._matSnackBar.open('You are Now Logged Out. Login To Continue.', 'Dismiss');
        window.sessionStorage.setItem('active_session', 'false');

        window.sessionStorage.removeItem('email_address');
        window.sessionStorage.removeItem('given_name');
        window.sessionStorage.removeItem('family_name');
        window.sessionStorage.removeItem('session_id');
        window.sessionStorage.removeItem('identity');
        window.sessionStorage.removeItem('ActiveSessions');
        window.sessionStorage.removeItem('SQ_User');
        window.sessionStorage.removeItem('SQ_User_ID');
        window.sessionStorage.removeItem('SQ_Main_Loc');


        setTimeout(() => {
          this._router.navigate(['/auth/signin']);
        });
      }
    });
  }

}
