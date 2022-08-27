import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginButtonComponent } from './components/login-button/login-button.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { IdentifierComponent } from './components/login-form/form-screens/identifier/identifier.component';
import { SignInComponent } from './components/login-form/form-screens/sign-in/sign-in.component';
import { SharedModule } from '@app/shared/shared.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    LoginButtonComponent,
    LoginFormComponent,
    IdentifierComponent,
    SignInComponent
  ],
  imports: [
		CommonModule,
		RouterModule,
		SharedModule
	],
	exports: [
		LoginButtonComponent,
		LoginFormComponent
	]
})
export class LoginModule { }
