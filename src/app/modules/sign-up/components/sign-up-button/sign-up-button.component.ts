import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-sign-up-button',
  templateUrl: './sign-up-button.component.html',
  styleUrls: ['./sign-up-button.component.scss']
})
export class SignUpButtonComponent implements OnInit {

	@Output() openSignUpForm = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
	}
	
	fireSignUp() {
		this.openSignUpForm.emit();
	}

}
