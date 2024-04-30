import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';

import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';

const routes: Routes = [
  { path: '', title: 'Authentication & Authorization', component: AuthComponent },
  { path: 'signup', title: 'Signup', component: SignupComponent },
  { path: 'signin', title: 'Signin', component: SigninComponent },
  { path: 'reset-password', title: 'Reset Password', component: PasswordResetComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
