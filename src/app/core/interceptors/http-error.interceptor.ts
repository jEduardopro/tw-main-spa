import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { HttpErrorState } from '@app/shared/store/reducers/http-error.reducer';
import { setFieldErrors } from '@app/shared/store/actions/http-error.actions';
import { ToastService } from '@app/shared/services/toast.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

	constructor(
		private store: Store<HttpErrorState>,
		private toastService: ToastService
	) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		return next.handle(request).pipe(
			catchError((error: HttpErrorResponse) => {				
				const { errors, message } = error.error
				if (errors) {
					this.store.dispatch(setFieldErrors({fieldErrors: errors}))
					setTimeout(() => {						
						this.store.dispatch(setFieldErrors({fieldErrors: null}))
					}, 10000);
					throw new Error(message)
				}

				if (error.error instanceof ErrorEvent) {
					this.toastService.toastError({ title: 'Error', message: error.error.message })
					throw new Error(error.error.message)
				}

				if (!message) {					
					this.toastService.toastError({ title: 'Error', message: error.message })
					throw new Error(error.message)
				}
				
				this.toastService.toastError({ title: 'Error', message })
				throw new Error(message)
			})
		)
  }
}
