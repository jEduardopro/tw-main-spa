import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../../modules/auth/services/auth.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '@app/store/app.reducers';
import { selectAuthUser } from '@app/modules/auth/store/selectors/auth.selectors';
import { Subscription } from 'rxjs';
import { UserAccountMenu } from '@app/shared/interfaces/user-account-menu.interface';


@Component({
  selector: 'app-account-menu',
  templateUrl: './account-menu.component.html',
  styles: [
  ]
})
export class AccountMenuComponent implements OnInit, OnDestroy {

	logoutMenuIsOpen = false;
	storeSubscription: Subscription = new Subscription;
	authUser: UserAccountMenu = {
		name: '',
		username: '',
		image: null
	}

	constructor(
		private authService: AuthService,
		private router: Router,
		private store: Store<AppState>
	) { }

	ngOnInit(): void {
		const user$ = this.store.select(selectAuthUser).subscribe(authUser => {
			this.authUser.name = authUser.name;
			this.authUser.username = authUser.username;
			this.authUser.image = authUser.image;
		})
		this.storeSubscription.add(user$)
	}

	ngOnDestroy(): void {
		this.storeSubscription.unsubscribe()
	}
	
	toggleLogoutMenu() {
		this.logoutMenuIsOpen = !this.logoutMenuIsOpen
	}

	closeLogoutMenu() {
		this.logoutMenuIsOpen = false
	}

	logout() {
		this.authService.logout()
		this.router.navigateByUrl("/")
	}

}
