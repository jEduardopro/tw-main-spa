import { Component, OnInit } from '@angular/core';
import { LoginForm } from '../../../../models/login-form.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-identifier',
  templateUrl: './identifier.component.html',
  styles: [
  ]
})
export class IdentifierComponent implements OnInit {

	login: LoginForm = new LoginForm();
	loading = false;

	constructor(
		private router: Router
	) { }

  ngOnInit(): void {
	}

	get mustBeDisabled(): boolean {
		return this.loading || !this.login.user_identifier?.trim().length
	}

	get buttonStatusClasses(): string {
		return this.mustBeDisabled
			? 'cursor-not-allowed bg-white opacity-50'
			: 'bg-white hover:bg-slate-100'
	}
	
	updateUserIdentifier(value: string) {

	}

	fireSignUpFlow() {
		this.router.navigateByUrl("/i/flow/signup")
	}

}
