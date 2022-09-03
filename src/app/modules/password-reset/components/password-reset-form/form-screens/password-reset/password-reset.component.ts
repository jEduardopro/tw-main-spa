import { Component, EventEmitter, OnInit, Output, OnDestroy } from '@angular/core';
import { AppState } from '@app/store/app.reducers';
import { Store } from '@ngrx/store';
import { firstValueFrom, Subscription } from 'rxjs';
import { PasswordResetService } from '../../../../services/password-reset.service';
import * as passwordResetSelectors from '../../../../store/selectors/password-reset.selectors';
import { PasswordResetPayload } from '../../../../interfaces/password-reset-payload.interface';
import { ToastService } from '../../../../../../shared/services/toast.service';
import * as passwordResetActions from '../../../../store/actions/password-reset.actions';
import * as httpErrorSelectors from '@app/shared/store/selectors/http-error.selectors';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styles: [
  ]
})
export class PasswordResetComponent implements OnInit, OnDestroy {

	loading = false;
	password = '';
	password_confirmation = ''
	flow_token = ''

	errors: any = {}

	@Output() passwordResetFinished = new EventEmitter<void>()

	subscriptionStore: Subscription = new Subscription()

	constructor(
		private passwordResetService: PasswordResetService,
		private store: Store<AppState>,
		private toastService: ToastService
	) { }

	ngOnInit(): void {
		const flow_token$ = this.store.select(passwordResetSelectors.selectFlowToken).subscribe(flowToken => {
			this.flow_token = flowToken
		})
		const errors$ = this.store.select(httpErrorSelectors.selectFieldErrors).subscribe(fieldErrors => {
			if (fieldErrors) {
				this.errors = fieldErrors
				return;
			}
			this.errors = {}
		})
		this.subscriptionStore.add(flow_token$)
		this.subscriptionStore.add(errors$)
	}

	ngOnDestroy(): void {
		this.subscriptionStore.unsubscribe()
	}
	
	get mustBeDisabled(): boolean {
		return this.loading || (!this.password.trim().length || !this.password_confirmation.trim().length)
	}

	get buttonStatusClasses(): string {
		return this.mustBeDisabled
			? 'cursor-not-allowed bg-white opacity-50'
			: 'bg-white hover:bg-slate-100'
	}

	updatePassword(value: string) {
		this.password = value
	}

	updatePasswordConfirmation(value: string) {
		this.password_confirmation = value
	}

	async resetPassword() {
		if (this.mustBeDisabled) {
			return
		}

		this.loading = true;
		try {
			const payload: PasswordResetPayload = {
				password: this.password,
				password_confirmation: this.password_confirmation,
				flow_token: this.flow_token
			}
			const response: any = await firstValueFrom(this.passwordResetService.reset(payload))
			this.toastService.toastSuccess({
				title: response.message
			})
			this.store.dispatch(passwordResetActions.setUserAccountInfo({
					account_info: {username: '', email: null, phone: null}
				})
			)
			this.store.dispatch(passwordResetActions.setFlowToken({flow_token: ''}))
			this.passwordResetFinished.emit()
		} catch (error) {
			
		}
		this.loading = false
	}

}
