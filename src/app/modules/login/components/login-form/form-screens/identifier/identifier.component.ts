import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LoginForm } from '@app/modules/login/models/login-form.model';
import { Router } from '@angular/router';
import { FindAccountService } from '@app/shared/services/find-account.service';
import { firstValueFrom } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '@app/store/app.reducers';
import * as loginActions from '@app/modules/login/store/actions/login.actions'

@Component({
  selector: 'app-identifier',
  templateUrl: './identifier.component.html',
  styles: [
  ]
})
export class IdentifierComponent implements OnInit {

	login: LoginForm = new LoginForm();
	loading = false;

	@Output() showNextScreen = new EventEmitter<void>()

	constructor(
		private router: Router,
		private store: Store<AppState>,
		private findAccountService: FindAccountService
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
		this.login.user_identifier = value;
	}

	async findAccountByUserIdentifier() {
		if (this.mustBeDisabled) {
			return;
		}
		this.loading = true

		try {
			const { account_info: { username } } = await firstValueFrom(this.findAccountService.find(this.login.user_identifier!))
			// console.log({account_info});
			this.store.dispatch(loginActions.setUserIdentifier({user_identifier: this.login.user_identifier!}))
			this.store.dispatch(loginActions.setUsername({username}))
			this.showNextScreen.emit();

		} catch (error) {

		}
		this.loading = false
	}

	fireSignUpFlow() {
		this.router.navigateByUrl("/i/flow/signup")
	}

}
