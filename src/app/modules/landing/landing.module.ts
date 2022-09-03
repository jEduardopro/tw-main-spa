import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingRoutingModule } from './landing-routing.module';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { RegisterModule } from "@app/modules/register";
import { LoginModule } from '../login/login.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    LandingPageComponent
  ],
  imports: [
		CommonModule,
		SharedModule,
		LandingRoutingModule,
		RegisterModule,
		LoginModule
	],
	exports: [
		LandingRoutingModule
	]
})
export class LandingModule { }
