import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NameFieldComponent } from './components/forms/name-field/name-field.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EmailFieldComponent } from './components/forms/email-field/email-field.component';
import { DateBirthSelectComponent } from './components/forms/date-birth-select/date-birth-select.component';
import { PhoneFieldComponent } from './components/forms/phone-field/phone-field.component';
import { ToastComponent } from './components/toast/toast.component';
import { ToasterComponent } from './components/toast/toaster.component';
import { VerificationCodeFieldComponent } from './components/forms/verification-code-field/verification-code-field.component';
import { StoreModule } from '@ngrx/store';
import { httpErrorFeatureKey, httpErrorReducer } from './store/reducers/http-error.reducer';
import { PasswordFieldComponent } from './components/forms/password-field/password-field.component';



@NgModule({
  declarations: [
    NameFieldComponent,
    EmailFieldComponent,
    DateBirthSelectComponent,
    PhoneFieldComponent,
    VerificationCodeFieldComponent,
    ToasterComponent,
    ToastComponent,
    PasswordFieldComponent,
  ],
  imports: [
		CommonModule,
		ReactiveFormsModule,
		StoreModule.forFeature(httpErrorFeatureKey, httpErrorReducer)
	],
	exports: [
		NameFieldComponent,
		EmailFieldComponent,
		PhoneFieldComponent,
		DateBirthSelectComponent,
		VerificationCodeFieldComponent,
		PasswordFieldComponent,
		ToasterComponent,
	]
})
export class SharedModule { }
