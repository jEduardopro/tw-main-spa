import { Component, EventEmitter, OnInit, Output, OnDestroy } from '@angular/core';
import { PasswordResetService } from '../../../../services/password-reset.service';
import { firstValueFrom, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '@app/store/app.reducers';
import * as httpErrorSelectors from '@app/shared/store/selectors/http-error.selectors';


@Component({
  selector: 'app-password-reset-verification-code',
  templateUrl: './password-reset-verification-code.component.html',
  styles: [
  ]
})
export class PasswordResetVerificationCodeComponent implements OnInit, OnDestroy {

	loading = false
	verification_code = ''
	errors: any = {};

	@Output() nextScreen = new EventEmitter<string>()

	subscriptionStore: Subscription = new Subscription()

	constructor(
		private passwordResetService: PasswordResetService,
		private store: Store<AppState>
	) { }

	ngOnInit(): void {
		const errors$ = this.store.select(httpErrorSelectors.selectFieldErrors).subscribe(fieldErrors => {
			if (fieldErrors) {
				this.errors = fieldErrors
				return;
			}
			this.errors = {}
		})
		this.subscriptionStore.add(errors$)
	}

	ngOnDestroy(): void {
		this.subscriptionStore.unsubscribe();
	}
	
	get mustBeDisabled(): boolean {
		return this.loading || !this.verification_code.trim().length
	}

	get buttonStatusClasses(): string {
		return this.mustBeDisabled
			? 'cursor-not-allowed bg-white opacity-50'
			: 'bg-white hover:bg-slate-100'
	}

	updateVerificationCode(value: string) {
		this.verification_code = value
	}

	async verifyCode() {
		if (this.mustBeDisabled) {
			return
		}

		this.loading = true;
		try {
			const response = await firstValueFrom(this.passwordResetService.verify(this.verification_code))
			this.nextScreen.emit('passwordResetScreen')
		} catch (error) {
			
		}
		this.loading = false;

	}

}
