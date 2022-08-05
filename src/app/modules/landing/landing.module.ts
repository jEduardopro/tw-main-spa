import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingRoutingModule } from './landing-routing.module';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { RegisterModule } from "@app/modules/register";

@NgModule({
  declarations: [
    LandingPageComponent
  ],
  imports: [
		CommonModule,
		LandingRoutingModule,
		RegisterModule
	],
	exports: [
		LandingRoutingModule
	]
})
export class LandingModule { }
