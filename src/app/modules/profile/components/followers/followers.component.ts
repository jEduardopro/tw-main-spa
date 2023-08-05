import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../services/profile.service';
import { Subscription, firstValueFrom } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '@app/store/app.reducers';
import { selectCurrentFollowersPage, selectFollowers, selectProfileId, selectProfileName, selectProfileUsername } from '../../store/selectors/profile.selectors';
import { decrementFollowingCount, incrementFollowingCount, setCurrentFollowersPage, setFollowersLoaded } from '../../store/actions/profile.actions';
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
	userId: string | null = null
	profileName: string | null = ''
	profileUsername: string | null = ''
	loading = false
	loadingMoreFollowers = false
	noMoreFollowersToLoad = false
	currentTab: 'followers' | 'following' = 'followers'

	constructor(
		private profileService: ProfileService,
		private store: Store<AppState>,
	) { }

	ngOnInit(): void {
		const followers$ = this.store.select(selectFollowers).subscribe(followers => {
			this.followers = JSON.parse(JSON.stringify(followers))
		})

		const currentFollowersPage$ = this.store.select(selectCurrentFollowersPage).subscribe(page => {
			this.page = page
		})

		const profileId$ = this.store.select(selectProfileId).subscribe(profileId => {			
			this.userId = profileId || null
			this.getFollowers()
		})

		const profileName$ = this.store.select(selectProfileName).subscribe(name => {
			this.profileName = name || ''
		})

		const profileUsername$ = this.store.select(selectProfileUsername).subscribe(username => {
			this.profileUsername = username || ''
		})

		this.storeSubscription.add(followers$)
		this.storeSubscription.add(currentFollowersPage$)
		this.storeSubscription.add(profileId$)
		this.storeSubscription.add(profileName$)
		this.storeSubscription.add(profileUsername$)
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
			const page = ++this.page;
			const { data } = await firstValueFrom(this.profileService.followers(this.userId, page))
			if (data.length == 0) {
				this.noMoreFollowersToLoad = true;
				this.loadingMoreFollowers = false;				
				return
			}
			this.followers.push(...data)
			
			this.store.dispatch(setFollowersLoaded({ followers: this.followers }))
			this.store.dispatch(setCurrentFollowersPage({ page }))
			
		} catch (error) {
			console.log(error);
		}
		this.loadingMoreFollowers = false;
	}

	setFollow(id: string, value: boolean) {
		const followerFound = this.followers.find(follower => follower.id === id)
		if (!followerFound) {
			return
		}
		followerFound.following = value
		this.store.dispatch(setFollowersLoaded({ followers: this.followers }))
		if (value) {
			this.store.dispatch(incrementFollowingCount())
		} else {
			this.store.dispatch(decrementFollowingCount())
		}
	}

}
