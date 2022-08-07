import { Component, OnInit, OnChanges, SimpleChanges, DoCheck, Output, EventEmitter } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { RegisterService } from '@app/modules/register/services/register.service';
import { RegisterState } from '@app/modules/register/store/reducers/register.reducer';
import { Store } from '@ngrx/store';
import { ToastService } from '@app/shared/services/toast.service';
import { UserFormData } from '@app/modules/register/models/user-form.model';

import * as registerActions from '@app/modules/register/store/actions/register.actions';
import * as registerSelectors from '@app/modules/register/store/selectors/register.selectors';

@Component({
	selector: 'app-step-one',
	templateUrl: './step-one.component.html',
	styles: [
	]
})
export class StepOneComponent implements OnInit{

	user: UserFormData = new UserFormData();
	errors: any = {};

	identifierType: ('email' | 'phone') = 'email';
	userDataIsValid = false;

	@Output() nextStep = new EventEmitter();

	constructor(
		private store: Store<RegisterState>,
		private registerService: RegisterService,
		private toastService: ToastService,
	) { }

	ngOnInit(): void {
		// this.store.select(registerSelectors.selectFieldsErrors).subscribe(errors => {
		// 	this.errors = errors;
		// })
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
	}

	registerUser() {
		if (!this.userDataIsValid) {
			return
		}

		this.registerService.register(this.user).subscribe((response) => {
			// console.log(response.);
			this.store.dispatch(registerActions.setRegisterResponse({ registerResponse: response }));
			this.nextStep.emit()

		}, (error: HttpErrorResponse) => {
			const { errors, message } = error.error
			if (errors) {
				this.errors = errors
				setTimeout(() => {
					// this.errors = {}
				}, 2000);
				return;
			}

			if (!message) {
				this.toastService.toastError({ title: 'Error', message: error.message })
				return
			}

			this.toastService.toastError({ title: 'Error', message })
		})
	}

	private validateUserData(): boolean {
		if (!this.user.name || !this.user.date_birth) {
			return false;
		}
		if (!this.user.email && !this.user.phone) {
			return false;
		}
		if (!this.user.phone && this.user.email && this.user.email.match(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)) {
			return true;
		}
		if (!this.user.email && this.user.phone && this.user.phone.match(/^([0-9]{3})?[-]?([0-9]{3})[-]?([0-9]{4})$/)) {
			return true;
		}

		return false;
	}

}
