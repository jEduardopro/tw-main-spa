import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserForm } from '@app/modules/register/models';
import { RegisterService } from '../../services/register.service';

@Component({
  selector: 'app-sign-up-stepper-form',
	templateUrl: './sign-up-stepper-form.component.html'
})
export class SignUpStepperFormComponent implements OnInit {

	@Output() close = new EventEmitter();

	public step: number = 1;
	public user: UserForm = new UserForm();
	public errors: any = {};

	constructor(
		private registerService: RegisterService
	) {
		// this.user.name = 'Eduardo'
		// this.user.email = 'jesus@gmail.com'
		// this.user.date_birth = '1993-11-22'
	}

  ngOnInit(): void {
	}

	public get firstStepFormIsValid() {
		if (this.user.name && this.user.email && this.user.date_birth) {
			return true;
		}
		return false
	}

	closeForm() {
		this.close.emit()
	}

	registerUser() {
		// if (!this.firstStepFormIsValid) {			
		// 	return
		// }
		let user = this.user;
		user.email ? delete user.phone : delete user.email

		console.log({user});
		

		this.registerService.register(user).subscribe((response: any) => {
			console.log({response});
			
		}, (error: HttpErrorResponse) => {
			const { errors } = error.error
			this.errors = {}
			if (errors) {
				this.errors = errors
				setTimeout(() => {
					this.errors = {}
				}, 2000);
				return;
			}
			console.log(error.error);
			console.log(error.message);
			console.log(error.status);
			console.log(error.type);
		})
	}

	next() {
		this.step++
	}

	prev() {
		this.step--
	}
}
