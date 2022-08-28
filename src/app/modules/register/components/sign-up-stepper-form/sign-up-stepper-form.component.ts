import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AppState } from '@app/store/app.reducers';
import { Store } from '@ngrx/store';
import { UserFormData } from '../../models/user-form.model';
import * as registerActions from '../../store/actions/register.actions';

@Component({
  selector: 'app-sign-up-stepper-form',
	templateUrl: './sign-up-stepper-form.component.html'
})
export class SignUpStepperFormComponent implements OnInit {

	@Output() close = new EventEmitter();

	public step: number = 1;
	private redirectToLandingAfterClose = false
	private userFormData: UserFormData = new UserFormData()

	constructor(
		private router: Router,
		private store: Store<AppState>
	) {}

	ngOnInit(): void {
		if (this.router.url == '/i/flow/signup') {
			this.redirectToLandingAfterClose = true
		}
	}

	closeForm() {
		this.close.emit()
		this.store.dispatch(registerActions.setUserFormData({userFormData: {...this.userFormData} }))
		if (this.redirectToLandingAfterClose) {
			this.router.navigateByUrl("/")
		}
	}

	nextStep() {
		this.step++
	}

	prevStep() {
		this.step--
	}
}
