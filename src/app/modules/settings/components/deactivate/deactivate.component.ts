import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from '@app/modules/auth/interfaces/user.interface';
import { selectAuthUser } from '@app/modules/auth/store/selectors/auth.selectors';
import { AppState } from '@app/store/app.reducers';
import { Store } from '@ngrx/store';
import { Subscription, firstValueFrom } from 'rxjs';
import { AccountDeactivationService } from '../../services/account-deactivation.service';

@Component({
  selector: 'app-deactivate',
  templateUrl: './deactivate.component.html',
  styles: [
  ]
})
export class DeactivateComponent implements OnInit, OnDestroy {

	storeSubscription: Subscription = new Subscription
	authUser!: User

	constructor(
		private store: Store<AppState>,
		private accountDeactivationService: AccountDeactivationService
	) { }

	ngOnInit(): void {
		const authUser$ = this.store.select(selectAuthUser).subscribe(authUser => {
			this.authUser = authUser
		})

		this.storeSubscription.add(authUser$)
	}

	ngOnDestroy(): void {
		this.storeSubscription.unsubscribe()
	}

	async deactivate() {
		try {
			const data = await firstValueFrom(this.accountDeactivationService.deactivateAccount())
			console.log(data);
		} catch (error) {
			
		}
	}

}
