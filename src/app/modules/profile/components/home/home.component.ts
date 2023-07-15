import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavigationService } from '@app/core/services/navigation.service';
import { CustomizeViewService } from '@app/modules/customize-view/services/customize-view.service';
import { AppState } from '@app/store/app.reducers';
import { Store } from '@ngrx/store';
import { Subscription, firstValueFrom } from 'rxjs';
import { Profile } from '../../interfaces/profile.interface';
import { ProfileService } from '../../services/profile.service';
import { selectProfileInfo } from '../../store/selectors/profile.selectors';
import { setProfile } from '../../store/actions/profile.actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent implements OnInit {

	profile: Profile|null = null
	loading = false
	username = ''
	storeSubscription: Subscription = new Subscription;

	constructor(
		public customizeView: CustomizeViewService,
		private route: ActivatedRoute,
		private profileService: ProfileService,
		private store: Store<AppState>,
		private navigationService: NavigationService
	) { }

	ngOnInit(): void {
		const profileInfo$ = this.store.select(selectProfileInfo).subscribe(profile => {
			if (!profile) {
				return
			}
			this.profile = profile
		})

		this.storeSubscription.add(profileInfo$)

		this.route.params.subscribe(params => {			
			this.username = params['username']
			this.getProfileInfo()
		})
	}

	ngOnDestroy(): void {
		this.storeSubscription.unsubscribe()
	}

	async getProfileInfo() {
		const profile: Profile | null = await firstValueFrom(this.store.select(selectProfileInfo))		
		if (profile && profile.username == this.username) {			
			this.profile = profile
			return;
		}
		
		this.loading = true;
		try {
			const response = await firstValueFrom(this.profileService.getProfile(this.username))
			this.profile = response;
			this.store.dispatch(setProfile({ profile: this.profile }))
		} catch (error) {
			
		}
		this.loading = false
	}

}
