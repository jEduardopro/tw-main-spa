import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PasswordResetFormComponent } from './components/password-reset-form/password-reset-form.component';


const routes: Routes = [
	{
		path: '',
		component: PasswordResetFormComponent
	}
]

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})

export class PasswordResetRoutingModule {}
