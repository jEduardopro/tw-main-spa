import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '@app/modules/auth/interfaces/user.interface';
import { selectAuthUser } from '@app/modules/auth/store/selectors/auth.selectors';
import { CustomizeViewService } from '@app/modules/customize-view/services/customize-view.service';
import { AppState } from '@app/store/app.reducers';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-account-information',
  templateUrl: './account-information.component.html',
  styles: [
  ]
})
export class AccountInformationComponent implements OnInit, OnDestroy {

	authUser!: User
	storeSubscription: Subscription = new Subscription

	constructor(
		public customizeView: CustomizeViewService,
		private router: Router,
		private store: Store<AppState>
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

	goTo(path: string){
		this.router.navigate([path])
	}

}
