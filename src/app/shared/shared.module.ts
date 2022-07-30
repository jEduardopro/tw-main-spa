import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NameFieldComponent } from './components/forms/name-field/name-field.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EmailFieldComponent } from './components/forms/email-field/email-field.component';
import { DateBirthSelectComponent } from './components/forms/date-birth-select/date-birth-select.component';
import { PhoneFieldComponent } from './components/forms/phone-field/phone-field.component';



@NgModule({
  declarations: [
    NameFieldComponent,
    EmailFieldComponent,
    DateBirthSelectComponent,
    PhoneFieldComponent
  ],
  imports: [
		CommonModule,
		ReactiveFormsModule
	],
	exports: [
		NameFieldComponent,
		EmailFieldComponent,
		PhoneFieldComponent,
		DateBirthSelectComponent
	]
})
export class SharedModule { }
