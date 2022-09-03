import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PasswordResetRoutingModule } from './password-reset-routing.module';

import { PasswordResetFormComponent } from './components/password-reset-form/password-reset-form.component';
import { FindAccountComponent } from './components/password-reset-form/form-screens/find-account/find-account.component';
import { PasswordResetViaComponent } from './components/password-reset-form/form-screens/password-reset-via/password-reset-via.component';
import { PasswordResetVerificationCodeComponent } from './components/password-reset-form/form-screens/password-reset-verification-code/password-reset-verification-code.component';
import { PasswordResetComponent } from './components/password-reset-form/form-screens/password-reset/password-reset.component';
import { SharedModule } from '@app/shared';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { passwordResetFeatureKey, passwordResetReducer } from './store/reducers/password-reste.reducer';



@NgModule({
  declarations: [
    PasswordResetFormComponent,
    FindAccountComponent,
    PasswordResetViaComponent,
    PasswordResetVerificationCodeComponent,
    PasswordResetComponent
  ],
  imports: [
		CommonModule,
		SharedModule,
		RouterModule,
		PasswordResetRoutingModule,
		StoreModule.forFeature(passwordResetFeatureKey, passwordResetReducer)
  ]
})
export class PasswordResetModule { }
