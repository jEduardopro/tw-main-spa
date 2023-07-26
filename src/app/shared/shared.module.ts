import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { UserProfileImageComponent } from './components/user-profile-image/user-profile-image.component';
import { StickyTopSectionComponent } from './components/sticky-top-section/sticky-top-section.component';
import { ImageUrlPipe } from '@app/core/pipes/image-url.pipe';
import { AuthModule } from '@app/modules/auth/auth.module';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { SearchBoxComponent } from './components/search-box/search-box.component';
import { ProfileItemComponent } from './components/profile-item/profile-item.component';
import { FriendshipModule } from '@app/modules/friendship/friendship.module';


@NgModule({
  declarations: [
    AccountMenuComponent,
    ClickOutsideDirective,
    DateBirthSelectComponent,
    EmailFieldComponent,
    IdentifierFieldComponent,
    LayoutComponent,
    NameFieldComponent,
    PasswordConfirmationFieldComponent,
    PasswordFieldComponent,
    PhoneFieldComponent,
    SidebarColumnComponent,
    SidebarMenuComponent,
    SvgLogoComponent,
    ToastComponent,
    ToasterComponent,
    UserProfileImageComponent,
    VerificationCodeFieldComponent,
		StickyTopSectionComponent,
		ImageUrlPipe,
		SpinnerComponent,
		SearchBoxComponent,
		ProfileItemComponent
  ],
  imports: [
		CommonModule,
		ReactiveFormsModule,
		CustomizeViewModule,
		AuthModule,
		RouterModule,
		HttpClientModule,
		FormsModule,
		FriendshipModule,
		StoreModule.forFeature(httpErrorFeatureKey, httpErrorReducer)
	],
	exports: [
		ClickOutsideDirective,
		DateBirthSelectComponent,
		EmailFieldComponent,
		IdentifierFieldComponent,
		LayoutComponent,
		NameFieldComponent,
		PasswordConfirmationFieldComponent,
		PasswordFieldComponent,
		PhoneFieldComponent,
		SvgLogoComponent,
		ToasterComponent,
		UserProfileImageComponent,
		VerificationCodeFieldComponent,
		StickyTopSectionComponent,
		ImageUrlPipe,
		SpinnerComponent,
		SearchBoxComponent,
		ProfileItemComponent
	]
})
export class SharedModule { }
