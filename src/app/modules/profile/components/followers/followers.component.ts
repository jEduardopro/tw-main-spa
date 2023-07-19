import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../services/profile.service';
import { Subscription, firstValueFrom } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '@app/store/app.reducers';
import { selectFollowers, selectProfileId } from '../../store/selectors/profile.selectors';
import { setFollowersLoaded } from '../../store/actions/profile.actions';
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
		const profileId$ = this.store.select(selectProfileId).subscribe(profileId => {			
			this.userId = profileId || null
			this.getFollowers()
		})

		const followers$ = this.store.select(selectFollowers).subscribe(followers => {
			this.followers = followers
		})

		this.storeSubscription.add(profileId$)
		this.storeSubscription.add(followers$)

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

	async onScroll() {
		if (!this.userId) return

		console.log("scrolled!! timeline home");
		this.loadingMoreFollowers = true;
		try {
			const {data} = await firstValueFrom(this.profileService.followers(this.userId, ++this.page))
			// const {data} = await firstValueFrom(this.timelineService.getHomeTimeline(++this.page))
			this.followers.push(...data)
			
		} catch (error) {
			console.log(error);
		}
		this.loadingMoreFollowers = false;
	}

	setFollow(value: boolean) {
		// this.profile.following = value
	}

}
