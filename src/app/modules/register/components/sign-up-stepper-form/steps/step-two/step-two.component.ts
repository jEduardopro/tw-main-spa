import { Component, OnInit, OnDestroy, EventEmitter, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import * as registerActions from '@app/modules/register/store/actions/register.actions';
import * as registerSelectors from '@app/modules/register/store/selectors/register.selectors';
import * as httpErrorSelectors from '@app/shared/store/selectors/http-error.selectors';
import { RegisterResponse } from '@app/modules/register/interfaces/register-response.interface';
import { AccountVerificationService } from '@app/modules/register/services/account-verification.service';
import { Subscription, firstValueFrom } from 'rxjs';
import { AppState } from '@app/store/app.reducers';

@Component({
  selector: 'app-step-two',
  templateUrl: './step-two.component.html',
  styles: [
  ]
})
export class StepTwoComponent implements OnInit, OnDestroy {

	code: string = '';
	loading = false;
	errors: any = {};

	subTitleDescription = '';

	storeSubscription: Subscription = new Subscription;

	@Output() nextStep = new EventEmitter();

	constructor(
		private store: Store<AppState>,
		private accountVerificationService: AccountVerificationService,
	) { }

	ngOnInit(): void {
		const registerResponseData$ = this.store.select(registerSelectors.selectRegisterResponse).subscribe(registerResponse => {
			this.setSubTitleDescription(registerResponse);
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
		this.storeSubscription.unsubscribe();
	}

	get mustBeDisabled(): boolean {
		return this.loading || !this.code.trim().length
	}

	get buttonStatusClasses(): string {
		return this.mustBeDisabled
			? 'cursor-not-allowed bg-white opacity-50'
			: 'bg-white hover:bg-slate-100'
	}
	
	private setSubTitleDescription(response: RegisterResponse) {
		const baseDescription = 'Enter it below to verify';
		const fieldWithWhichItWasRegistered = response.description == 'signup_with_email' ? response.email : response.phone
		
		this.subTitleDescription = `${baseDescription} ${fieldWithWhichItWasRegistered}`
	}

	async verifyCode() {
		this.store.dispatch(registerActions.toggleLoading({ status: true }))
		try {
			const response = await firstValueFrom(this.accountVerificationService.verify(this.code));
			console.log({ response });
			// this.store.dispatch(registerActions.setRegisterResponse({ registerResponse: response }))
			this.nextStep.emit();
		} catch (error) {
			// console.log(error);
		}
		this.store.dispatch(registerActions.toggleLoading({ status: false }))
	}
}
