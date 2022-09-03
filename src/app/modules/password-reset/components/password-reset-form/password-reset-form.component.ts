import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PasswordResetScreen } from '../../interfaces/password-reset-screen.interface';

@Component({
  selector: 'app-password-reset-form',
  templateUrl: './password-reset-form.component.html',
  styles: [
  ]
})
export class PasswordResetFormComponent implements OnInit {

	screens: PasswordResetScreen = {
		"findAccountScreen": false,
		"passwordResetViaScreen": false,
		"passwordResetVerificationCodeScreen": false,
		"passwordResetScreen": false,
	}

	constructor(
		private router: Router
	) { }

	ngOnInit(): void {
		this.showScreen("findAccountScreen")
	}

	get findAccountScreenIsActive(): boolean {
		return this.screens["findAccountScreen"]
	}
	
	get passwordResetViaScreenIsActive(): boolean {
		return this.screens["passwordResetViaScreen"]
	}

	get passwordResetVerificationCodeScreenIsActive(): boolean {
		return this.screens["passwordResetVerificationCodeScreen"]
	}
	get passwordResetScreenIsActive(): boolean {
		return this.screens["passwordResetScreen"]
	}
	
	closeForm() {
		this.router.navigateByUrl("/")
	}

	showScreen(screen: string) {
		Object.keys(this.screens).forEach(screenKey => {
			this.screens[screenKey] = false
		})
		this.screens[screen] = true
	}

}
