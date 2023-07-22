import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription, firstValueFrom } from 'rxjs';
import { ProfileService } from '../../services/profile.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../store/app.reducers';
import { setProfile } from '../../store/actions/profile.actions';
import { Profile } from '../../interfaces/profile.interface';
import { CustomizeViewService } from '../../../customize-view/services/customize-view.service';
import { selectProfileInfo } from '../../store/selectors/profile.selectors';
import { NavigationService } from '@app/core/services/navigation.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
	styles: [
		`
			:host {
				display:flex;
				flex-direction: column;
				flex-grow:1;
				position:relative;
			}
		`
  ]
})
export class ProfileComponent implements OnInit {

	profile: Profile|null = null
	loading = false
	titles: Record<string, string> = {}
	username = ''
	storeSubscription: Subscription = new Subscription;

	constructor(
		public customizeView: CustomizeViewService,
		private router: Router,
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
			this.setTitles()
		})


		this.router.events.subscribe((event) => {

			if (event instanceof NavigationEnd) {
				// Hide loading indicator
				const urlPath = this.router.url
				this.setTitleDocument(urlPath)
			}
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

	get profileFound(): Boolean {
		return this.profile !== null
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
			console.log(error);
		}
		this.loading = false
	}

	goToBack() {
		this.navigationService.back()
	}

	setTitleDocument(urlPathKey: string) {		
		const title = this.titles[urlPathKey]
		if (!title) {			
			return;
		}
		document.title = title
	}

	setTitles() {
		this.titles = {
			[`/${this.profile?.username}/followers`]: `People following ${this.profile?.name} (@${this.profile?.username}) / Twitter`,
			[`/${this.profile?.username}/following`]: `People followed by ${this.profile?.name} (@${this.profile?.username}) / Twitter`,
		}
	}

}
