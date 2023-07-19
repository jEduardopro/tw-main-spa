import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../services/profile.service';
import { Subscription, firstValueFrom } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '@app/store/app.reducers';
import { selectProfileId } from '../../store/selectors/profile.selectors';
import { setFollowersLoaded } from '../../store/actions/profile.actions';

@Component({
  selector: 'app-followers',
  templateUrl: './followers.component.html',
  styles: [
  ]
})
export class FollowersComponent implements OnInit {

	storeSubscription: Subscription = new Subscription;
	page = 1;
	userId: string|null = null
	loading = false
	loadingMoreTweets = false
	noMoreTweetsToLoad = false

	constructor(
		private profileService: ProfileService,
		private store: Store<AppState>,
	) { }

	ngOnInit(): void {
		const profileId$ = this.store.select(selectProfileId).subscribe(profileId => {			
			this.userId = profileId || null
			this.getFollowers()
		})

		this.storeSubscription.add(profileId$)

	}

	ngOnDestroy(): void {
		this.storeSubscription.unsubscribe()
	}

	async getFollowers() {
		if (!this.userId) return

		this.loading = true
		try {
			const {data} = await firstValueFrom(this.profileService.followers(this.userId, this.page))
			console.log(data);
			this.store.dispatch(setFollowersLoaded({ followers: data }))
			
		} catch (error) {
			console.log(error);
		}
		this.loading = false
	}

}
