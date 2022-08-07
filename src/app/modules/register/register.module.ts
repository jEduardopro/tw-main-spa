import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from "@angular/common/http";

import { SignUpButtonComponent } from './components/sign-up-button/sign-up-button.component';
import { SignUpStepperFormComponent } from './components/sign-up-stepper-form/sign-up-stepper-form.component';
import { StepOneComponent } from './components/sign-up-stepper-form/steps/step-one/step-one.component';
import { StepTwoComponent } from './components/sign-up-stepper-form/steps/step-two/step-two.component';
import { StepThreeComponent } from './components/sign-up-stepper-form/steps/step-three/step-three.component';
import { SharedModule } from '@app/shared/';
import { StoreModule } from '@ngrx/store';
import { registerFeatureKey, registerReducer } from './store/reducers/register.reducer';



@NgModule({
  declarations: [
    SignUpButtonComponent,
    SignUpStepperFormComponent,
    StepOneComponent,
    StepTwoComponent,
    StepThreeComponent
  ],
  imports: [
		CommonModule,
		SharedModule,
		StoreModule.forFeature(registerFeatureKey, registerReducer)
	],
	exports: [
		SignUpButtonComponent,
		SignUpStepperFormComponent
	]
})
export class RegisterModule { }
