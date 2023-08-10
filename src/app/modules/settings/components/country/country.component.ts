import { Component, OnDestroy, OnInit } from '@angular/core';
import { CustomizeViewService } from '@app/modules/customize-view/services/customize-view.service';
import countriesJson from '@app/core/utils/countries.json'
import { AccountPersonalizationService } from '../../services/account-personalization.service';
import { Subscription, firstValueFrom } from 'rxjs';
import { ToastService } from '@app/shared/services/toast.service';
import { Store } from '@ngrx/store';
import { AppState } from '@app/store/app.reducers';
import { selectAuthUser, selectAuthUserCountry } from '@app/modules/auth/store/selectors/auth.selectors';
import { User } from '@app/modules/auth/interfaces/user.interface';
import { AuthService } from '@app/modules/auth/services/auth.service';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styles: [
  ]
})
export class CountryComponent implements OnInit, OnDestroy {

	onFocus = false;
	country = 'United States'
	countries = countriesJson
	storeSubscription: Subscription = new Subscription
	authUser!: User

	constructor(
		public customizeView: CustomizeViewService,
		private accountPersonalizationService: AccountPersonalizationService,
		private toastService: ToastService,
		private store: Store<AppState>,
		private authService: AuthService
	) { }

	ngOnInit(): void {
		const authUser$ = this.store.select(selectAuthUser).subscribe(authUser => {
			this.authUser = authUser
		})

		const country$ = this.store.select(selectAuthUserCountry).subscribe(country => {
			this.country = country || 'United States'
		})

		this.storeSubscription.add(country$)
		this.storeSubscription.add(authUser$)
	}

	ngOnDestroy(): void {
		this.storeSubscription.unsubscribe()
	}
	
	async updateCountry() {
		try {
			const { message } = await firstValueFrom(this.accountPersonalizationService.updateCountry(this.country))
			this.toastService.toastSuccess({ title: message })
			this.authService.saveAuthenticatedUser({...this.authUser!, country: this.country})
		} catch (error) {
			
		}
	}

}
