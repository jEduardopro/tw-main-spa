import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { AppState } from '@app/store/app.reducers';
import { Store } from '@ngrx/store';
import * as loginSelectors from '@app/modules/login/store/selectors/login.selectors';
import { Subscription, firstValueFrom } from 'rxjs';
import { ReactivateAccountService } from '@app/modules/login/services/reactivate-account.service';
import { AuthService } from '@app/modules/auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reactivate-account',
  templateUrl: './reactivate-account.component.html',
  styles: [
  ]
})
export class ReactivateAccountComponent implements OnInit, OnDestroy {

	@Input() reactivationDeadline!: string
	@Output() reactivationFinished = new EventEmitter<void>()
	userIdentifier: string = ''
	password: string = ''

	loading = false
	storeSubscription: Subscription = new Subscription

	constructor(
		private reactivateAccountService: ReactivateAccountService,
		private store: Store<AppState>,
		private authService: AuthService,
		private router: Router,
	) { }

	ngOnInit(): void {
		const user_identifier$ = this.store.select(loginSelectors.selectUserIdentifier).subscribe(user_identifier => {
			this.userIdentifier = user_identifier
		})

		const password$ = this.store.select(loginSelectors.selectUserPassword).subscribe(password => {
			this.password = password
		})

		this.storeSubscription.add(user_identifier$)
		this.storeSubscription.add(password$)
	}

	ngOnDestroy(): void {
		this.storeSubscription.unsubscribe()
	}

	async reactivate() {
		this.loading = true
		try {
			const {user, token} = await firstValueFrom(this.reactivateAccountService.reactivateAccount({ user_identifier: this.userIdentifier, password: this.password }))
			this.authService.saveAuthenticatedUser(user)
			this.authService.saveTokenInLocalStorage(token)
			this.reactivationFinished.emit()
			this.router.navigateByUrl("/home")
		} catch (error) {
			
		}
		this.loading = false
	}

	cancel() {
		this.reactivationFinished.emit()
	}

}
