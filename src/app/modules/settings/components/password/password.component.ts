import { Component, OnDestroy, OnInit } from '@angular/core';
import { CustomizeViewService } from '@app/modules/customize-view/services/customize-view.service';
import { selectFieldErrors } from '@app/shared/store/selectors/http-error.selectors';
import { AppState } from '@app/store/app.reducers';
import { Store } from '@ngrx/store';
import { Subscription, firstValueFrom } from 'rxjs';
import { AccountPasswordService } from '../../services/account-password.service';
import { ToastService } from '@app/shared/services/toast.service';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styles: [
  ]
})
export class PasswordComponent implements OnInit, OnDestroy {

	cpOnFocus = false;
	npOnFocus = false;
	confirmPassOnFocus = false;
	currentPassword = ''
	newPassword = ''
	confirmPassword = ''
	errors: any = {};
	storeSubscription: Subscription = new Subscription
	saving = false

	constructor(
		public customizeView: CustomizeViewService,
		private accountPasswordService: AccountPasswordService,
		private store: Store<AppState>,
		private toastService: ToastService
	) { }

	ngOnInit(): void {
		const fieldErrors$ = this.store.select(selectFieldErrors).subscribe(fieldErrors => {
			if (fieldErrors) {
				this.errors = fieldErrors
				return;
			}
			this.errors = {}
		})

		this.storeSubscription.add(fieldErrors$)
	}

	ngOnDestroy(): void {
		this.storeSubscription.unsubscribe()
	}

	get shouldBeDisabled() {
		return this.currentPassword.length === 0 ||
			this.newPassword.length === 0 || this.confirmPassword.length === 0 ||
			this.newPassword !== this.confirmPassword || this.saving
	}

	async savePassword() {
		this.saving = true
		try {
			const { message } = await firstValueFrom(this.accountPasswordService.updatePassword({
				current_password: this.currentPassword,
				new_password: this.newPassword,
				new_password_confirmation: this.confirmPassword,
			}))

			this.toastService.toastSuccess({ title: message })
			this.resetInputs()
		} catch (error) {
			
		}
		this.saving = false
	}

	resetInputs() {
		this.currentPassword = ''
		this.newPassword = ''
		this.confirmPassword = ''
	}
}
