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
import { IdentifierFieldComponent } from './components/forms/identifier-field/identifier-field.component';
import { HttpClientModule } from '@angular/common/http';
import { SvgLogoComponent } from './components/svg-logo/svg-logo.component';
import { PasswordConfirmationFieldComponent } from './components/forms/password-confirmation-field/password-confirmation-field.component';


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
    IdentifierFieldComponent,
    SvgLogoComponent,
    PasswordConfirmationFieldComponent,
  ],
  imports: [
		CommonModule,
		ReactiveFormsModule,
		CustomizeViewModule,
		RouterModule,
		HttpClientModule,
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
		ClickOutsideDirective,
		IdentifierFieldComponent,
		SvgLogoComponent,
		PasswordConfirmationFieldComponent
	]
})
export class SharedModule { }
