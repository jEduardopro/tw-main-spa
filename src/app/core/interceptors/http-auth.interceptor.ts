import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../../modules/auth/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class HttpAuthInterceptor implements HttpInterceptor {

	constructor(
		private router: Router,
		private authService: AuthService
	) {}

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		
		const token: string | null = this.authService.getToken();
		let req = request;

		if (token) {
			req = request.clone({
				setHeaders: {
					'Authorization': `Bearer ${token}`
				}
			})
		}

		// return next.handle(req).pipe(
		// 	catchError((err: HttpErrorResponse) => {

		// 		if (err.status === 401) {
		// 			this.router.navigateByUrl("/")
		// 		}

		// 		throw new Error(err.message)
		// 	})
		// )
		return next.handle(req)
  }
}
