import { Injectable } from '@angular/core';
import { AppState } from '@app/store/app.reducers';
import { Store } from '@ngrx/store';
import { AuthUser } from '../interfaces/auth-user.interface';
import * as authActions from '../store/actions/auth.actions';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

	private apiUrl = environment.apiUrl
	private tokenKey = 'tw-token';
	private authUserKey = 'tw-user';

	constructor(
		private store: Store<AppState>,
		private http: HttpClient
	) {
	}

	setUserAuthFromLS() {
		if (!this.isAuth()) {
			console.log('is unauthenticated');
			return;
		}
		const authUser = this.getAuthUserFromLocalStorage()!
		this.store.dispatch(authActions.setAuthUser({authUser}))
	}

	saveAuthenticatedUser(authUser:AuthUser) {
		this.store.dispatch(authActions.setAuthUser({ authUser }))

		this.saveAuthUserInLocalStorage(authUser);
	}

	private saveAuthUserInLocalStorage(authUser: AuthUser) {
		localStorage.setItem(this.authUserKey, JSON.stringify(authUser));
	}

	saveTokenInLocalStorage(token: string) {
		localStorage.setItem(this.tokenKey, token);
	}

	getToken(): string | null {
		const token = localStorage.getItem(this.tokenKey);
		if (!token) {
			return null;
		}
		return token
	}

	getAuthUserFromLocalStorage(): AuthUser | null {
		const authUser = localStorage.getItem(this.authUserKey);
		if (!authUser) {
			return null;
		}
		return JSON.parse(authUser) as AuthUser
	}

	isAuth(): boolean {
		return !!this.getToken() && !!this.getAuthUserFromLocalStorage()
	}

	logout(): void {
		this.http.post(`${this.apiUrl}/auth/logout`, null)
				.subscribe((response: any) => {
						console.log(response.message);
						
				}, (error) => {
					console.log(error);
				});
		
		localStorage.removeItem(this.tokenKey)
		localStorage.removeItem(this.authUserKey)
	}
}
