import { AuthGuard } from '@app/core/guards/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuestGuard } from './core/guards/guest.guard';

const routes: Routes = [
	{
		path: '',
		canActivate: [GuestGuard],
		loadChildren: () =>  import("./modules/landing/landing.module").then(m => m.LandingModule)
	},
	{
		path: 'i/flow',
		children: [
			{
				path: 'signup',
				loadChildren: () => import("./modules/register/register.module").then(m => m.RegisterModule)
			},
			{
				path: 'password_reset',
				loadChildren: () => import("./modules/password-reset/password-reset.module").then(m => m.PasswordResetModule)
			}
		]
	},
	{
		path: 'home',
		canActivate: [AuthGuard],
		loadChildren: () => import("./modules/home/home.module").then(m => m.HomeModule)
	},
	{
		path: 'search',
		canActivate: [AuthGuard],
		loadChildren: () => import("./modules/explore/explore.module").then(m => m.ExploreModule)
	},
	{
		path: 'settings',
		canActivate: [AuthGuard],
		loadChildren: () => import("./modules/settings/settings.module").then(m => m.SettingsModule)
	},
	{
		path: ':username',
		canActivate: [AuthGuard],
		loadChildren: () => import("./modules/profile/profile.module").then(m => m.ProfileModule)
	},
	{
		path: '**',
		redirectTo: ''
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes, {
		useHash: false
	})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
