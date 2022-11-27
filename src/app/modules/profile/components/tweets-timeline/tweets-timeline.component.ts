import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../store/app.reducers';
import { firstValueFrom } from 'rxjs';
import { ProfileService } from '../../services/profile.service';
import { selectTweetsLoaded, selectCurrentPage, selectProfileId } from '../../store/selectors/profile.selectors';
import { CustomizeViewService } from '../../../customize-view/services/customize-view.service';
import { Tweet } from '@app/modules/tweets/interfaces/tweet.interface';
import { setTweetsLoaded, setCurrentPage } from '../../store/actions/profile.actions';
import { User } from '@app/modules/auth/interfaces/user.interface';

@Component({
  selector: 'app-tweets-timeline',
  templateUrl: './tweets-timeline.component.html',
  styles: [
  ]
})
export class TweetsTimelineComponent implements OnInit {

	tweets: Tweet[] = [];
	page = 1;
	userId: string = ''
	loading = false
	loadingMoreTweets = false
	noMoreTweetsToLoad = false
	
	constructor(
		public customizeView: CustomizeViewService,
		private store: Store<AppState>,
		private profileService: ProfileService
	) { }

	ngOnInit(): void {
		this.getProfileTweets()
	}
	
	async getProfileTweets() {
		const userId: any = await firstValueFrom(this.store.select(selectProfileId))
		const tweetsLoaded: Tweet[] = await firstValueFrom(this.store.select(selectTweetsLoaded))
		const currentPage: number = await firstValueFrom(this.store.select(selectCurrentPage))
		if (tweetsLoaded.length > 0 && tweetsLoaded[0].owner.id == userId) {
			this.tweets = tweetsLoaded
			this.page = currentPage
			this.userId = userId
			this.setTitleDocument(tweetsLoaded[0].owner)
			return;
		}
		this.userId = userId
		
		this.loading = true;
		
		try {
			const response: any = await firstValueFrom(this.profileService.getUserTweetsTimeline(userId!, this.page))
			this.tweets = response.data
			this.store.dispatch(setTweetsLoaded({ tweets: this.tweets }))
			this.setTitleDocument(this.tweets[0].owner)
		} catch (error) {
			this.tweets = []
		}
		this.loading = false

	}

	async onScroll() {
		if (this.noMoreTweetsToLoad) {
			return;
		}
		this.loadingMoreTweets = true;
		try {
			const page = ++this.page;
			const { data } = await firstValueFrom(this.profileService.getUserTweetsTimeline(this.userId, page))
			if (data.length == 0) {
				this.noMoreTweetsToLoad = true;
				this.loadingMoreTweets = false
				return;
			}			
			this.tweets = this.tweets.concat(data)
			
			this.store.dispatch(setTweetsLoaded({tweets: this.tweets}))
			this.store.dispatch(setCurrentPage({page}))
			
		} catch (error) {
			console.log(error);
		}
		this.loadingMoreTweets = false;
	}

	setTitleDocument(user: User) {
		const nameCapitalized = user.name.split(' ').reduce((acc, state) => {
			acc += state.charAt(0).toUpperCase() + state.slice(1) + ' '
			return acc
		}, '').trimEnd()
		
		const title = `${nameCapitalized} (@${user.username}) / Twitter`
		document.title = title
	}

}