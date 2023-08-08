import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { LayoutComponent } from './components/layout/layout.component';
import { SharedModule } from '@app/shared';
import { DeactivateComponent } from './components/deactivate/deactivate.component';
import { PasswordComponent } from './components/password/password.component';
import { ScreenNameComponent } from './components/screen-name/screen-name.component';
import { AccountInformationComponent } from './components/account-information/account-information.component';
import { FormsModule } from '@angular/forms';
import { CountryComponent } from './components/country/country.component';


@NgModule({
	declarations: [
		LayoutComponent,
		DeactivateComponent,
		PasswordComponent,
		ScreenNameComponent,
		CountryComponent,
		AccountInformationComponent
	],
  imports: [
		CommonModule,
		SharedModule,
		FormsModule,
    SettingsRoutingModule
  ]
})
export class SettingsModule { }
