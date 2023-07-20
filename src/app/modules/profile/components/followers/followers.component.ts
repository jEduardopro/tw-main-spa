import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../services/profile.service';
import { Subscription, firstValueFrom } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '@app/store/app.reducers';
import { selectCurrentFollowersPage, selectFollowers, selectProfileId } from '../../store/selectors/profile.selectors';
import { setCurrentFollowersPage, setFollowersLoaded } from '../../store/actions/profile.actions';
import { Profile } from '../../interfaces/profile.interface';

@Component({
  selector: 'app-followers',
  templateUrl: './followers.component.html',
  styles: [
  ]
})
export class FollowersComponent implements OnInit {

	followers: Profile[] = [];
	storeSubscription: Subscription = new Subscription;
	page = 1;
	userId: string|null = null
	loading = false
	loadingMoreFollowers = false
	noMoreFollowersToLoad = false

	constructor(
		private profileService: ProfileService,
		private store: Store<AppState>,
	) { }

	ngOnInit(): void {
		const followers$ = this.store.select(selectFollowers).subscribe(followers => {
			this.followers = followers
		})

		const currentFollowersPage$ = this.store.select(selectCurrentFollowersPage).subscribe(page => {
			this.page = page
		})

		const profileId$ = this.store.select(selectProfileId).subscribe(profileId => {			
			this.userId = profileId || null
			this.getFollowers()
		})

		this.storeSubscription.add(followers$)
		this.storeSubscription.add(currentFollowersPage$)
		this.storeSubscription.add(profileId$)
	}

	ngOnDestroy(): void {
		this.storeSubscription.unsubscribe()
	}

	async getFollowers() {
		if (!this.userId || this.followers.length) return		

		this.loading = true
		try {
			const {data} = await firstValueFrom(this.profileService.followers(this.userId, this.page))			
			this.store.dispatch(setFollowersLoaded({ followers: data }))
			
		} catch (error) {
			console.log(error);
		}
		this.loading = false
	}

	async onScroll() {
		if (!this.userId || this.noMoreFollowersToLoad) return

		this.loadingMoreFollowers = true;
		try {
			const { data } = await firstValueFrom(this.profileService.followers(this.userId, ++this.page))
			if (data.length == 0) {
				this.noMoreFollowersToLoad = true;
				this.loadingMoreFollowers = false;
			}
			this.followers.push(...data)
			this.store.dispatch(setFollowersLoaded({ followers: this.followers }))
			this.store.dispatch(setCurrentFollowersPage({ page: this.page }))
			
		} catch (error) {
			console.log(error);
		}
		this.loadingMoreFollowers = false;
	}

	setFollow(value: boolean) {
		// this.profile.following = value
	}

}
