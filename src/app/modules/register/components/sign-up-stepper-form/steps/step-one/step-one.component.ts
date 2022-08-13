import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { RegisterService } from '@app/modules/register/services/register.service';
import { Store } from '@ngrx/store';
import { UserFormData } from '@app/modules/register/models/user-form.model';

import * as registerActions from '@app/modules/register/store/actions/register.actions';
import * as registerSelectors from '@app/modules/register/store/selectors/register.selectors';
import * as httpErrorSelectors from '@app/shared/store/selectors/http-error.selectors';
import { Subscription, firstValueFrom } from 'rxjs';
import { AppState } from '@app/store/app.reducers';

@Component({
	selector: 'app-step-one',
	templateUrl: './step-one.component.html',
	styles: [
	]
})
export class StepOneComponent implements OnInit, OnDestroy{

	user: UserFormData = new UserFormData();
	errors: any = {};

	identifierType: ('email' | 'phone') = 'email';
	userDataIsValid = false;
	loading = false;
	storeSubscription: Subscription = new Subscription;

	@Output() nextStep = new EventEmitter();

	constructor(
		private store: Store<AppState>,
		private registerService: RegisterService,
	) { }

	ngOnInit(): void {
		const userData$ = this.store.select(registerSelectors.selectUserInfo).subscribe(userData => {
			if (Object.keys(userData).length > 0) {
				this.user = {...userData};
			}
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
		this.storeSubscription.add(userData$)
		this.storeSubscription.add(loading$);
		this.storeSubscription.add(errors$);
	}

	ngOnDestroy(): void {
		this.storeSubscription.unsubscribe();
	}

	get mustBeDisabled(): boolean {
		return this.loading || !this.userDataIsValid
	}

	get buttonStatusClasses(): string {
		return this.mustBeDisabled
			? 'cursor-not-allowed bg-white opacity-50'
			: 'bg-white hover:bg-slate-100'
	}

	toggleIdentifierField() {
		if (this.identifierType == 'email') {
			this.identifierType = 'phone'
			return;
		}
		
		this.identifierType = 'email'
	}

	updateUser(value: string, field: string) {
		if (field == 'name') {
			this.user.name = value;
		}
		if (field == 'email') {
			this.user.email = value;
		}
		if (field == 'phone') {
			this.user.phone = value;
		}
		if (field == 'date_birth') {
			this.user.date_birth = value;
		}
		this.userDataIsValid = this.validateUserData()
		if (this.userDataIsValid) {
			this.store.dispatch(registerActions.setUserFormData({ userFormData: {...this.user} }))
		}
	}

	async registerUser() {
		if (!this.userDataIsValid) {
			return
		}

		this.store.dispatch(registerActions.toggleLoading({ status: true }))
		try {
			const response = await firstValueFrom(this.registerService.register(this.user));
			console.log({ response });
			this.store.dispatch(registerActions.setRegisterResponse({ registerResponse: response }))
			this.nextStep.emit();
		} catch (error) {
			// console.log(error);
		}
		this.store.dispatch(registerActions.toggleLoading({ status: false }))
	}

	private validateUserData(): boolean {
		if (!this.user.name || !this.user.date_birth) {
			return false;
		}
		if (!this.user.email && !this.user.phone) {
			return false;
		}
		if (!this.user.phone && this.user.email && this.user.email.match(/^[a-z0-9._%+-]+@[a-z0-9.-]{2,8}\.[a-z]{2,4}$/)) {
			return true;
		}
		if (!this.user.email && this.user.phone && this.user.phone.match(/^([0-9]{3})?[-]?([0-9]{3})[-]?([0-9]{4})$/)) {
			return true;
		}

		return false;
	}

}
