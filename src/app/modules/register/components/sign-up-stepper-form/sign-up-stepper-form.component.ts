import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Output, EventEmitter, ChangeDetectorRef, AfterViewChecked } from '@angular/core';
import { RegisterService } from '../../services/register.service';
import { ToastService } from '@app/shared/services/toast.service';
import { Store } from '@ngrx/store';
import * as registerSelectors from '../../store/selectors/register.selectors';
import { RegisterState } from '../../store/reducers/register.reducer';
import { UserFormData } from '../../models/user-form.model';
import * as registerActions from '../../store/actions/register.actions';

@Component({
  selector: 'app-sign-up-stepper-form',
	templateUrl: './sign-up-stepper-form.component.html'
})
export class SignUpStepperFormComponent implements OnInit, AfterViewChecked {

	@Output() close = new EventEmitter();

	public step: number = 1;
	public user!: UserFormData;
	public firstStepFormIsValid = false;
	public errors: any = {};

	constructor(
		private registerService: RegisterService,
		private toastService: ToastService,
		private store: Store<RegisterState>,
		private cdr: ChangeDetectorRef
	) {}

	ngOnInit(): void {
		this.store.select(registerSelectors.selectUserInfo).subscribe(userInfo => {
			if (!this.validateUserData(userInfo)) {
				this.firstStepFormIsValid = false;
				return;
			}
			this.firstStepFormIsValid = true;
			this.user = userInfo;
		})
	}

	ngAfterViewChecked(): void {
		this.cdr.detectChanges();
	}

	closeForm() {
		this.close.emit()
	}

	nextStep() {
		this.step++
	}

	prevStep() {
		this.step--
	}

	registerUser() {
		if (!this.firstStepFormIsValid) {
			return
		}

		this.registerService.register(this.user).subscribe((response) => {
			// console.log(response.);
			// this.store.dispatch(registerActions.setSignUpDescription({ signUpDescription: response.description }));
			this.nextStep();

		}, (error: HttpErrorResponse) => {
			const { errors, message } = error.error
			if (errors) {
				// this.store.dispatch(registerActions.setFieldsErrors({fieldsErrors: errors}))
				setTimeout(() => {
					// this.store.dispatch(registerActions.setFieldsErrors({ fieldsErrors: {} }))
				}, 2000);
				return;
			}

			if (!message) {
				this.toastService.toastError({title: 'Error', message: error.message})
				return
			}

			this.toastService.toastError({title: 'Error', message})
		})
	}

	private validateUserData(userData: UserFormData): boolean {
		if (!userData.name || !userData.date_birth) {
			return false;
		}
		if (!userData.email && !userData.phone) {
			return false;
		}
		if (!userData.phone && userData.email && userData.email.match(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)) {
			return true;
		}
		if (!userData.email && userData.phone && userData.phone.match(/^([0-9]{3})?[-]?([0-9]{3})[-]?([0-9]{4})$/)) {
			return true;
		}

		return false;
	}
}
