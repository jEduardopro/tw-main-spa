import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AppState } from '@app/store/app.reducers';
import { Store } from '@ngrx/store';
import * as loginActions from '../../store/actions/login.actions';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styles: [
  ]
})
export class LoginFormComponent implements OnInit {

	showSignInScreen = false
	showReactivateScreen = false
	reactivationDeadline = ''

	@Output() close = new EventEmitter();

	constructor(
		private store: Store<AppState>
	) { }

  ngOnInit(): void {
	}
	
	get mustShowIdentifierScreen(): boolean {
		return !this.showSignInScreen && !this.showReactivateScreen
	}

	get mustShowSignInScreen(): boolean {
		return this.showSignInScreen
	}

	closeForm() {
		this.close.emit()
		this.store.dispatch(loginActions.setUserIdentifier({user_identifier: ''}))
		this.store.dispatch(loginActions.setUsername({username: ''}))
	}

	showReactivateAccountScreen(reactivationDeadline: string) {
		this.showReactivateScreen = true
		this.showSignInScreen = false
		this.reactivationDeadline = reactivationDeadline
	}

}
