import { Component } from '@angular/core';
import { CustomizeViewService } from '@app/modules/customize-view/services/customize-view.service';
import { AccountPersonalizationService } from '../../services/account-personalization.service';
import { Subscription, firstValueFrom } from 'rxjs';
import { ToastService } from '@app/shared/services/toast.service';
import { Router } from '@angular/router';
import { selectAuthUser, selectAuthUserEmail, selectAuthUserGender } from '@app/modules/auth/store/selectors/auth.selectors';
import { AppState } from '@app/store/app.reducers';
import { Store } from '@ngrx/store';
import { User } from '@app/modules/auth/interfaces/user.interface';
import { AuthService } from '@app/modules/auth/services/auth.service';

@Component({
  selector: 'app-gender',
  templateUrl: './gender.component.html',
  styles: [
  ]
})
export class GenderComponent {

	gender: 'male'|'female'|'addGender' = 'male'
	newGender: 'male'|'female'|'addGender' = 'male'
	ownGender = ''
	onFocus = false;
	saving = false;
	storeSubscription: Subscription = new Subscription
	authUser!: User

	constructor(
		public customizeView: CustomizeViewService,
		private accountPersonalizationService: AccountPersonalizationService,
		private toastService: ToastService,
		private router: Router,
		private store: Store<AppState>,
		private authService: AuthService
	) { }

	ngOnInit(): void {
		const authUser$ = this.store.select(selectAuthUser).subscribe(authUser => {
			this.authUser = authUser
		})

		const gender$ = this.store.select(selectAuthUserGender).subscribe(gender => {
			if (gender && ['male','female'].includes(gender)) {
				this.gender = gender as 'male' | 'female'
				this.newGender = gender as 'male'|'female'
			}
			if (gender && !['male','female'].includes(gender)) {
				this.gender = 'addGender'
				this.newGender = 'addGender'
				this.ownGender = gender
			}
		})

		this.storeSubscription.add(gender$)
		this.storeSubscription.add(authUser$)
	}

	ngOnDestroy(): void {
		this.storeSubscription.unsubscribe()
	}

	get shouldBeDisabled() {
		return this.gender === this.ownGender ||
			this.saving ||
			this.gender === this.newGender ||
			(this.newGender === 'addGender' && this.ownGender.length === 0)
	}

	async saveGender() {
		this.saving = true
		try {
			const { message } = await firstValueFrom(this.accountPersonalizationService.updateGender(this.newGender))
			this.toastService.toastSuccess({ title: message })
			this.router.navigate(['/settings/your_twitter_data/account'])
			this.authService.saveAuthenticatedUser({...this.authUser!, gender: this.newGender})
		} catch (error) {
			
		}
		this.saving = false
	}

}
