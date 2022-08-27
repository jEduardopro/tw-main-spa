import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { SignUpStepperFormComponent } from './components/sign-up-stepper-form/sign-up-stepper-form.component';

const routes: Routes = [
	{
		path: '',
		component: SignUpStepperFormComponent
	}
]

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})


export class RegisterRoutingModule {}