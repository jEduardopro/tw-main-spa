import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { StoreModule } from '@ngrx/store';
import { httpErrorFeatureKey, httpErrorReducer } from './store/reducers/http-error.reducer';

import { NameFieldComponent } from './components/forms/name-field/name-field.component';
import { EmailFieldComponent } from './components/forms/email-field/email-field.component';
import { DateBirthSelectComponent } from './components/forms/date-birth-select/date-birth-select.component';
import { PhoneFieldComponent } from './components/forms/phone-field/phone-field.component';
import { ToastComponent } from './components/toast/toast.component';
import { ToasterComponent } from './components/toast/toaster.component';
import { VerificationCodeFieldComponent } from './components/forms/verification-code-field/verification-code-field.component';
import { PasswordFieldComponent } from './components/forms/password-field/password-field.component';
import { LayoutComponent } from './components/layout/layout.component';
import { SidebarMenuComponent } from './components/sidebar-menu/sidebar-menu.component';
import { SidebarColumnComponent } from './components/sidebar-column/sidebar-column.component';
import { CustomizeViewModule } from '../modules/customize-view/customize-view.module';
import { AccountMenuComponent } from './components/account-menu/account-menu.component';

import { ClickOutsideDirective } from './directives/click-outside.directive';


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
    LayoutComponent,
    SidebarMenuComponent,
    SidebarColumnComponent,
    AccountMenuComponent,
    ClickOutsideDirective,
  ],
  imports: [
		CommonModule,
		ReactiveFormsModule,
		CustomizeViewModule,
		RouterModule,
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
		LayoutComponent,
		ClickOutsideDirective
	]
})
export class SharedModule { }
