import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sign-up-stepper-form',
  templateUrl: './sign-up-stepper-form.component.html',
  styleUrls: ['./sign-up-stepper-form.component.scss']
})
export class SignUpStepperFormComponent implements OnInit {

	@Output() close = new EventEmitter();

	public step: number = 1;

  constructor() { }

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
