import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppState } from '@app/store/app.reducers';
import { Store } from '@ngrx/store';
import { RegisterResponse } from '@app/modules/register/interfaces/register-response.interface';

import * as registerActions from '@app/modules/register/store/actions/register.actions';
import * as registerSelectors from '@app/modules/register/store/selectors/register.selectors';
import * as httpErrorSelectors from '@app/shared/store/selectors/http-error.selectors';
import { Subscription, firstValueFrom } from 'rxjs';
import { SignUpPayload } from '../../../../interfaces/sign-up-payload.interface';
import { SignUpService } from '../../../../services/sign-up.service';

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


	constructor(
		private store: Store<AppState>,
		private signUpService: SignUpService
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
			const response = await firstValueFrom(this.signUpService.signUp(signUpPayload))
			console.log({response});
			
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
