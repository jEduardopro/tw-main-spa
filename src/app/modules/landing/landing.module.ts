import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingRoutingModule } from './landing-routing.module';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { SignUpModule } from '../sign-up/sign-up.module';


@NgModule({
  declarations: [
    LandingPageComponent
  ],
  imports: [
    CommonModule,
		LandingRoutingModule,
		SignUpModule
	],
	exports: [
		LandingRoutingModule
	]
})
export class LandingModule { }
