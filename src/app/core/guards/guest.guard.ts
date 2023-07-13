import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../modules/auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class GuestGuard  {

	constructor(
		private authService: AuthService,
		private router: Router
	) {}

	canActivate(): boolean {
		if (this.authService.isAuth()) {
			this.router.navigateByUrl("/home")
		}
		return !this.authService.isAuth()
	}
  
}
