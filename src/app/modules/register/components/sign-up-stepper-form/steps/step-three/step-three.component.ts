import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { AppState } from '@app/store/app.reducers';
import { Store } from '@ngrx/store';
import { RegisterResponse } from '@app/modules/register/interfaces/register-response.interface';

import * as registerActions from '@app/modules/register/store/actions/register.actions';
import * as registerSelectors from '@app/modules/register/store/selectors/register.selectors';
import * as httpErrorSelectors from '@app/shared/store/selectors/http-error.selectors';
import { Subscription, firstValueFrom } from 'rxjs';
import { SignUpPayload } from '@app/modules/register/interfaces';
import { SignUpService } from '@app/modules/register/services';
import { AuthService } from '@app/modules/auth/services/auth.service';

@Component({
  selector: 'app-step-three',
  templateUrl: './step-three.component.html',
  styles: [
  ]
})
export class StepThreeComponent implements OnInit, OnDestroy {

	password: string = '';
	registerResponseData: RegisterResponse = {
		message: '',
		description: 'signup_with_email'
	}
	errors: any = {};
	loading = false;

	storeSubscription: Subscription = new Subscription;

	@Output() registerFinished = new EventEmitter()


	constructor(
		private store: Store<AppState>,
		private signUpService: SignUpService,
		private authService: AuthService
	) { }

	ngOnInit(): void {
		const registerResponseData$ = this.store.select(registerSelectors.selectRegisterResponse).subscribe(registerResponse => {
			this.registerResponseData = registerResponse
		})
		const loading$ = this.store.select(registerSelectors.selectLoading).subscribe(loading => {
			this.loading = loading
		})
		const errors$ = this.store.select(httpErrorSelectors.selectFieldErrors).subscribe(fieldErrors => {
			if (fieldErrors) {
				this.errors = fieldErrors
				return;
			}
			this.errors = {}
		})
		this.storeSubscription.add(registerResponseData$)
		this.storeSubscription.add(loading$)
		this.storeSubscription.add(errors$)
	}

	ngOnDestroy(): void {
		this.storeSubscription.unsubscribe()
	}

	get mustBeDisabled(): boolean {
		return this.loading || !this.password.trim().length
	}

	get buttonStatusClasses(): string {
		return this.mustBeDisabled
			? 'cursor-not-allowed bg-twitter-sky-100 opacity-50'
			: 'bg-twitter-sky-100 hover:bg-twitter-sky-200'
	}
	
	async signUp() {
		const signUpPayload: SignUpPayload = this.getSignUpPayloadOfUser()

		this.store.dispatch(registerActions.toggleLoading({ status: true }));
		try {
			const {user, token} = await firstValueFrom(this.signUpService.signUp(signUpPayload))
			this.authService.saveAuthenticatedUser(user)
			this.authService.saveTokenInLocalStorage(token)
			this.registerFinished.emit();
			
		} catch (error) {
			
		}
		this.store.dispatch(registerActions.toggleLoading({ status: false }));
	}

	private getSignUpPayloadOfUser(): SignUpPayload {
		return {
			description: this.registerResponseData.description,
			email: this.registerResponseData.description == 'signup_with_email' ? this.registerResponseData.email! : null,
			phone: this.registerResponseData.description == 'signup_with_phone' ? this.registerResponseData.phone! : null,
			password: this.password
		}
	}

}
