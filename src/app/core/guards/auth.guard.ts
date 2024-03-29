import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../modules/auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard  {

	constructor(
		private authService: AuthService,
		private router: Router
	) 
	{}

	canActivate(): boolean {
		const isAuth = this.authService.isAuth()
		if (!isAuth) {
			this.router.navigateByUrl("/")
		};
		return isAuth;
	}
	
	canLoad(): boolean {
		const isAuth = this.authService.isAuth()
		if (!isAuth) {
			this.router.navigateByUrl("/")
		};
		return isAuth;
  }
}
