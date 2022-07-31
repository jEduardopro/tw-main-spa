import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignUpButtonComponent } from './components/sign-up-button/sign-up-button.component';
import { SignUpStepperFormComponent } from './components/sign-up-stepper-form/sign-up-stepper-form.component';
import { StepOneComponent } from './components/sign-up-stepper-form/steps/step-one/step-one.component';
import { StepTwoComponent } from './components/sign-up-stepper-form/steps/step-two/step-two.component';
import { StepThreeComponent } from './components/sign-up-stepper-form/steps/step-three/step-three.component';
import { SharedModule } from '../../shared/shared.module';



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
		SharedModule
	],
	exports: [
		SignUpButtonComponent,
		SignUpStepperFormComponent
	]
})
export class SignUpModule { }