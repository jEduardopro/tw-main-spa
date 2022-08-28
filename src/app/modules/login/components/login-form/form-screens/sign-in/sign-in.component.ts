import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@app/modules/auth/services/auth.service';
import { LoginForm } from '@app/modules/login/models/login-form.model';
import * as loginSelectors from '@app/modules/login/store/selectors/login.selectors';
import { AppState } from '@app/store/app.reducers';
import { Store } from '@ngrx/store';
import { firstValueFrom, Subscription } from 'rxjs';
import { LoginService } from '../../../../services/login.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styles: [
  ]
})
export class SignInComponent implements OnInit, OnDestroy {

	login: LoginForm = new LoginForm();
	username!: string
	loading = false;

	subscriptionStore: Subscription = new Subscription()

	@Output() loginFinished = new EventEmitter<void>()

	constructor(
		private router: Router,
		private store: Store<AppState>,
		private loginService: LoginService,
		private authService: AuthService
	) { }

	ngOnInit(): void {
		const user_identifier$ = this.store.select(loginSelectors.selectUserIdentifier).subscribe(user_identifier => {
			this.login.user_identifier = user_identifier
		})
		const username$ = this.store.select(loginSelectors.selectUsername).subscribe(username => {
			this.username = username
		})
		this.subscriptionStore.add(user_identifier$)
		this.subscriptionStore.add(username$)
	}

	ngOnDestroy(): void {
		this.subscriptionStore.unsubscribe()
	}
	
	get mustBeDisabled(): boolean {
		return this.loading || !this.login.password?.trim().length
	}

	get buttonStatusClasses(): string {
		return this.mustBeDisabled
			? 'cursor-not-allowed bg-white opacity-50'
			: 'bg-white hover:bg-slate-100'
	}

	updateUserPassword(value: string) {
		this.login.password = value;
	}

	fireSignUpFlow() {
		this.router.navigateByUrl("/i/flow/signup")
	}

	async signIn() {
		if (this.mustBeDisabled) {
			return;
		}

		this.loading = true;
		try {
			
			const {user, token} = await firstValueFrom(this.loginService.login(this.login))
			// console.log(response);
			this.authService.saveAuthenticatedUser(user)
			this.authService.saveTokenInLocalStorage(token)
			this.loginFinished.emit();
			this.router.navigateByUrl("/home")
		} catch (error) {
			
		}
		this.loading = false
	}

}
