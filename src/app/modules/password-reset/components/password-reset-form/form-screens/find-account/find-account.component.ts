import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FindAccountService } from '@app/shared/services/find-account.service';
import { AppState } from '@app/store/app.reducers';
import { Store } from '@ngrx/store';
import { firstValueFrom } from 'rxjs';
import * as passwordResetActions from '@app/modules/password-reset/store/actions/password-reset.actions';
import { PASSWORD_RESET_BEGIN } from '../../../../../../core/utils/tasks';

@Component({
  selector: 'app-find-account',
  templateUrl: './find-account.component.html',
  styles: [
  ]
})
export class FindAccountComponent implements OnInit {

	loading = false;
	user_identifier: string = ""

	@Output() nextScreen = new EventEmitter<string>()

	constructor(
		private findAccountService: FindAccountService,
		private store: Store<AppState>
	) { }

  ngOnInit(): void {
	}
	
	get mustBeDisabled(): boolean {
		return this.loading || !this.user_identifier?.trim().length
	}

	get buttonStatusClasses(): string {
		return this.mustBeDisabled
			? 'cursor-not-allowed bg-white opacity-50'
			: 'bg-white hover:bg-slate-100'
	}

	updateUserIdentifier(value: string) {
		this.user_identifier = value
	}

	async searchAccount() {
		if (this.mustBeDisabled) {
			return
		}
		this.loading = true

		try {
			const { account_info, flow_token } = await firstValueFrom(this.findAccountService.find(this.user_identifier, PASSWORD_RESET_BEGIN))
			
			this.store.dispatch(passwordResetActions.setUserAccountInfo({ account_info }))
			this.store.dispatch(passwordResetActions.setFlowToken({ flow_token }))
			this.nextScreen.emit("passwordResetViaScreen")

		} catch (error) {
			
		}
		this.loading = false

	}

}
