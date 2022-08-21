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
		path: 'home',
		canActivate: [AuthGuard],
		loadChildren: () => import("./modules/home/home.module").then(m => m.HomeModule)
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
