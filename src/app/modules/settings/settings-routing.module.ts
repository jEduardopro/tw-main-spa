import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { AccountComponent } from './components/account/account.component';
import { AccountInformationComponent } from './components/account-information/account-information.component';
import { PasswordComponent } from './components/password/password.component';
import { DeactivateComponent } from './components/deactivate/deactivate.component';
import { ScreenNameComponent } from './components/screen-name/screen-name.component';
import { CountryComponent } from './components/country/country.component';
import { GenderComponent } from './components/gender/gender.component';
import { EmailComponent } from './components/email/email.component';

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
				path: 'screen_name',
				component: ScreenNameComponent
			},
			{
				path: 'email',
				component: EmailComponent
			},
			{
				path: 'country',
				component: CountryComponent
			},
			{
				path: 'gender',
				component: GenderComponent
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
