import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { AccountComponent } from './components/account/account.component';
import { AccountInformationComponent } from './components/account-information/account-information.component';
import { PasswordComponent } from './components/password/password.component';
import { DeactivateComponent } from './components/deactivate/deactivate.component';

const routes: Routes = [
	{
		path: '',
		component: LayoutComponent,
		children: [
			{
				path: 'account',
				component: AccountComponent
			},
			{
				path: 'your_twitter_data/account',
				component: AccountInformationComponent
			},
			{
				path: 'password',
				component: PasswordComponent
			},
			{
				path: 'deactivate',
				component: DeactivateComponent
			}
		]
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
