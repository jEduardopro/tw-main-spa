import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppState } from '@app/store/app.reducers';
import { Store } from '@ngrx/store';
import { Subscription, firstValueFrom } from 'rxjs';
import { Profile } from '../../interfaces/profile.interface';
import { ProfileService } from '../../services/profile.service';
import { setFollowingLoaded, setCurrentFollowingPage, incrementFollowingCount, decrementFollowingCount } from '../../store/actions/profile.actions';
import { selectCurrentFollowingPage, selectFollowing, selectProfileId, selectProfileName, selectProfileUsername } from '../../store/selectors/profile.selectors';

@Component({
  selector: 'app-following',
  templateUrl: './following.component.html',
  styles: [
  ]
})
export class FollowingComponent implements OnInit, OnDestroy {

	following: Profile[] = [];
	storeSubscription: Subscription = new Subscription;
	page = 1;
	userId: string | null = null
	profileName: string | null = ''
	profileUsername: string | null = ''
	loading = false
	loadingMoreFollowing = false
	noMoreFollowingToLoad = false

	constructor(
		private profileService: ProfileService,
		private store: Store<AppState>,
	) { }
	
	ngOnInit(): void {
		const following$ = this.store.select(selectFollowing).subscribe(following => {
			this.following = JSON.parse(JSON.stringify(following))
		})

		const currentFollowingPage$ = this.store.select(selectCurrentFollowingPage).subscribe(page => {
			this.page = page
		})

		const profileId$ = this.store.select(selectProfileId).subscribe(profileId => {			
			this.userId = profileId || null
			this.getFollowing()
		})

		const profileName$ = this.store.select(selectProfileName).subscribe(name => {
			this.profileName = name || ''
		})

		const profileUsername$ = this.store.select(selectProfileUsername).subscribe(username => {
			this.profileUsername = username || ''
		})

		this.storeSubscription.add(following$)
		this.storeSubscription.add(currentFollowingPage$)
		this.storeSubscription.add(profileId$)
		this.storeSubscription.add(profileName$)
		this.storeSubscription.add(profileUsername$)
	}

	ngOnDestroy(): void {
		this.storeSubscription.unsubscribe()
	}

	async getFollowing() {
		if (!this.userId || this.following.length) return		

		this.loading = true
		try {
			const {data} = await firstValueFrom(this.profileService.following(this.userId, this.page))			
			this.store.dispatch(setFollowingLoaded({ following: data }))
			
		} catch (error) {
			console.log(error);
		}
		this.loading = false
	}

	async onScroll() {
		if (!this.userId || this.noMoreFollowingToLoad) return

		this.loadingMoreFollowing = true;
		try {
			const page = ++this.page;
			const { data } = await firstValueFrom(this.profileService.following(this.userId, page))
			if (data.length == 0) {
				this.noMoreFollowingToLoad = true;
				this.loadingMoreFollowing = false;				
				return
			}
			this.following.push(...data)
			
			this.store.dispatch(setFollowingLoaded({ following: this.following }))
			this.store.dispatch(setCurrentFollowingPage({ page }))
			
		} catch (error) {
			console.log(error);
		}
		this.loadingMoreFollowing = false;
	}

	setFollow(id: string, value: boolean) {
		const followingFound = this.following.find(following => following.id === id)
		if (!followingFound) {
			return
		}
		followingFound.following = value
		this.store.dispatch(setFollowingLoaded({ following: this.following }))
		if (value) {
			this.store.dispatch(incrementFollowingCount())
		} else {
			this.store.dispatch(decrementFollowingCount())
		}
	}

}
