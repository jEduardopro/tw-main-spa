import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-login-button',
  templateUrl: './login-button.component.html',
	styles: [
		`
			.login-btn{
				min-width: 36px;
				min-height: 36px;
				width: 300px;
				height: 40px;
				max-width: 380px;
			}
		`
  ]
})
export class LoginButtonComponent implements OnInit {

	@Output() openLoginForm = new EventEmitter<void>()

  constructor() { }

  ngOnInit(): void {
	}
	
	fireLoginForm() {
		this.openLoginForm.emit();
	}

}
