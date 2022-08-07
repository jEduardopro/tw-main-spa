import { Component, OnInit } from '@angular/core';
import { RegisterState } from '@app/modules/register/store/reducers/register.reducer';
import { Store } from '@ngrx/store';
import * as registerSelectors from '@app/modules/register/store/selectors/register.selectors';
import { RegisterResponse } from '@app/modules/register/interfaces/register-response.interface';
import { AccountVerificationService } from '@app/modules/register/services/account-verification.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastService } from '@app/shared/services/toast.service';

@Component({
  selector: 'app-step-two',
  templateUrl: './step-two.component.html',
  styles: [
  ]
})
export class StepTwoComponent implements OnInit {

	code: string = '';
	errors: any = {};

	subTitleDescription = '';

	constructor(
		private store: Store<RegisterState>,
		private accountVerificationService: AccountVerificationService,
		private toastService: ToastService,
	) { }

	ngOnInit(): void {
		this.store.select(registerSelectors.selectRegisterResponse).subscribe(registerResponse => {
			this.setSubTitleDescription(registerResponse);
		})
	}
	
	private setSubTitleDescription(response: RegisterResponse) {
		const baseDescription = 'Enter it below to verify';
		const fieldWithWhichItWasRegistered = response.description == 'signup_with_email' ? response.email : response.phone
		
		this.subTitleDescription = `${baseDescription} ${fieldWithWhichItWasRegistered}`
	}

	verifyCode() {

		this.accountVerificationService.verify(this.code).subscribe((response) => {
			console.log({response});
			
		}, (error: HttpErrorResponse) => {			
			const { errors, message } = error.error
			
			if (errors) {
				this.errors = errors
				setTimeout(() => {
					this.errors = {}
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

}
