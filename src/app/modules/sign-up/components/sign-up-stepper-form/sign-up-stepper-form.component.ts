import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SignUp } from '../../../../core/models/sign-up.model';

@Component({
  selector: 'app-sign-up-stepper-form',
  templateUrl: './sign-up-stepper-form.component.html',
  styleUrls: ['./sign-up-stepper-form.component.scss']
})
export class SignUpStepperFormComponent implements OnInit {

	@Output() close = new EventEmitter();

	public step: number = 1;
	public user: SignUp = new SignUp();

	constructor() {
		this.user.name = 'Eduardo'
		this.user.email = 'jesus@gmail.com'
		this.user.date_birth = '1993-11-22'
	}

  ngOnInit(): void {
	}

	closeForm() {
		this.close.emit()
	}

	next() {
		this.step++
	}

	prev() {
		this.step--
	}
}
