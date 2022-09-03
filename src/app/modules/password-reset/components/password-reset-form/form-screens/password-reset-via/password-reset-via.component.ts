import { Component, EventEmitter, OnInit, Output, OnDestroy } from '@angular/core';
import { AppState } from '@app/store/app.reducers';
import { Store } from '@ngrx/store';
import { Subscription, firstValueFrom } from 'rxjs';
import * as passwordResetSelectors from '@app/modules/password-reset/store/selectors/password-reset.selectors';
import { AccountInfoFound } from '@app/shared/interfaces/find-account-response.interface';
import { PasswordResetService } from '@app/modules/password-reset/services/password-reset.service';
import { SendPasswordResetPayload } from '@app/modules/password-reset/interfaces/send-password-reset-payload.interface';

@Component({
  selector: 'app-password-reset-via',
  templateUrl: './password-reset-via.component.html',
  styles: [
  ]
})
export class PasswordResetViaComponent implements OnInit, OnDestroy {

	loading = false;
	account_info!: AccountInfoFound;
	flow_token = '';
	emailOptionSelected = false
	phoneOptionSelected = false

	@Output() nextScreen = new EventEmitter<string>()

	subscriptionStore: Subscription = new Subscription()

	constructor(
		private store: Store<AppState>,
		private passwordResetService: PasswordResetService
	) { }

	ngOnInit(): void {
		const account_info$ = this.store.select(passwordResetSelectors.selectAccountInfo).subscribe(accountInfo => {
			this.account_info = accountInfo
		})
		const flow_token$ = this.store.select(passwordResetSelectors.selectFlowToken).subscribe(flowToken => {
			this.flow_token = flowToken
		})
		this.subscriptionStore.add(account_info$)
		this.subscriptionStore.add(flow_token$)
	}

	ngOnDestroy(): void {
		this.subscriptionStore.unsubscribe()
	}
	
	get mustBeDisabled(): boolean {
		return this.loading || (!this.emailOptionSelected && !this.phoneOptionSelected)
	}

	get buttonStatusClasses(): string {
		return this.mustBeDisabled
			? 'cursor-not-allowed bg-white opacity-50'
			: 'bg-white hover:bg-slate-100'
	}

	get mustSeeEmailOption(): boolean {
		if (!this.account_info) {
			return false
		}
		if (!this.account_info.email) {
			return false
		}
		return true
	}

	get mustSeePhoneOption(): boolean {
		if (!this.account_info) {
			return false
		}
		if (!this.account_info.phone) {
			return false
		}
		return true
	}

	toggleOption(option: string) {
		if (this.emailOptionSelected && !this.account_info.phone) {
			return;
		}
		if (this.phoneOptionSelected && !this.account_info.email) {
			return;
		}
		if (option == "email") {
			this.emailOptionSelected = !this.emailOptionSelected
			this.phoneOptionSelected = false
		}

		if (option == "phone") {
			this.phoneOptionSelected = !this.phoneOptionSelected
			this.emailOptionSelected = false
		}
	}

	async sendVerificationCode() {
		if (this.mustBeDisabled) {
			return
		}

		this.loading = true
		try {
			const payload: SendPasswordResetPayload = {
				description: this.emailOptionSelected ? 'reset_password_by_email' : 'reset_password_by_phone',
				email: this.emailOptionSelected ? this.account_info.email : null,
				phone: this.phoneOptionSelected ? this.account_info.phone : null,
				flow_token: this.flow_token
			}
			const response = await firstValueFrom(this.passwordResetService.sendVerificationCode(payload))
			this.nextScreen.emit('passwordResetVerificationCodeScreen')
		} catch (error) {
			
		}
		this.loading = false
	}

}
