import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from '@app/modules/auth/interfaces/user.interface';
import { AuthService } from '@app/modules/auth/services/auth.service';
import { selectAuthUser, selectAuthUserEmail } from '@app/modules/auth/store/selectors/auth.selectors';
import { CustomizeViewService } from '@app/modules/customize-view/services/customize-view.service';
import { AppState } from '@app/store/app.reducers';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styles: [
  ]
})
export class EmailComponent implements OnInit, OnDestroy {

	email = ''
	authUser!: User
	storeSubscription: Subscription = new Subscription

	constructor(
		public customizeView: CustomizeViewService,
		private store: Store<AppState>,
		private authService: AuthService
	) { }

	ngOnInit(): void {
		const authUser$ = this.store.select(selectAuthUser).subscribe(authUser => {
			this.authUser = authUser
		})

		const email$ = this.store.select(selectAuthUserEmail).subscribe(email => {
			this.email = email || ''
		})

		this.storeSubscription.add(email$)
		this.storeSubscription.add(authUser$)
	}

	ngOnDestroy(): void {
		this.storeSubscription.unsubscribe()
	}

}
