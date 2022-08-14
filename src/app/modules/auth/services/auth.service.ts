import { Injectable } from '@angular/core';
import { AppState } from '@app/store/app.reducers';
import { Store } from '@ngrx/store';
import { AuthUser } from '../interfaces/auth-user.interface';
import * as authActions from '../store/actions/auth.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

	constructor(
		private store: Store<AppState>
	) { }

	saveAuthenticatedUser(authUser:AuthUser) {
		this.store.dispatch(authActions.setAuthUser({ authUser }))

		this.saveAuthUserInLocalStorage(authUser);
	}

	private saveAuthUserInLocalStorage(authUser: AuthUser) {
		localStorage.setItem('tw-user', JSON.stringify(authUser));
	}

	saveTokenInLocalStorage(token: string) {
		localStorage.setItem('tw-token', token);
	}

	getToken(): string | null {
		const token = localStorage.getItem('tw-token');
		if (!token) {
			return null;
		}
		return token
	}

	getAuthUserFromLocalStorage(): AuthUser | null {
		const authUser = localStorage.getItem('tw-user');
		if (!authUser) {
			return null;
		}
		return JSON.parse(authUser) as AuthUser
	}
}
