import { Component, OnDestroy, OnInit } from '@angular/core';
import { selectAuthUser, selectAuthUsername } from '@app/modules/auth/store/selectors/auth.selectors';
import { CustomizeViewService } from '@app/modules/customize-view/services/customize-view.service';
import { AppState } from '@app/store/app.reducers';
import { Store } from '@ngrx/store';
import { Subscription, firstValueFrom } from 'rxjs';
import { AccountInformationService } from '../../services/account-information.service';
import { selectFieldErrors } from '@app/shared/store/selectors/http-error.selectors';
import { AuthService } from '@app/modules/auth/services/auth.service';
import { User } from '@app/modules/auth/interfaces/user.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-screen-name',
  templateUrl: './screen-name.component.html',
  styles: [
  ]
})
export class ScreenNameComponent implements OnInit, OnDestroy {

	onFocus = false;
	newUsername = ''
	authUsername = ''
	authUser: User|null = null
	saving = false
	storeSubscription: Subscription = new Subscription
	errors: any = {};


	constructor(
		public customizeView: CustomizeViewService,
		private accountInfoService: AccountInformationService,
		private authService: AuthService,
		private store: Store<AppState>,
		private router: Router
	) { }

	ngOnInit(): void {
		const authUsername$ = this.store.select(selectAuthUsername).subscribe(username => {
			this.newUsername = username
			this.authUsername = username
		})

		const userAuth$ = this.store.select(selectAuthUser).subscribe(user => {
			this.authUser = user
		})

		const fieldErrors$ = this.store.select(selectFieldErrors).subscribe(fieldErrors => {
			if (fieldErrors) {
				this.errors = fieldErrors
				return;
			}
			this.errors = {}
		})

		this.storeSubscription.add(authUsername$)
		this.storeSubscription.add(userAuth$)
		this.storeSubscription.add(fieldErrors$)
	}

	ngOnDestroy(): void {
		this.storeSubscription.unsubscribe()
	}

	get shouldBeDisabled() {
		return this.newUsername === this.authUsername || this.newUsername.length < 5 || this.saving
	}

	async saveUsername() {
		this.saving = true
		try {
			await firstValueFrom(this.accountInfoService.updateUsername(this.newUsername))
			this.authService.saveAuthenticatedUser({ ...this.authUser!, username: this.newUsername })
			this.router.navigate(['/settings/your_twitter_data/account'])
		} catch (error) {
			
		}
		this.saving = false
	}
}
