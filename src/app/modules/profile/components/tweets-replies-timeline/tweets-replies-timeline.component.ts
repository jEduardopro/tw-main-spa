import { Component, OnInit } from '@angular/core';
import { CustomizeViewService } from '@app/modules/customize-view/services/customize-view.service';
import { Tweet } from '@app/modules/tweets/interfaces/tweet.interface';
import { AppState } from '@app/store/app.reducers';
import { Store } from '@ngrx/store';
import { ProfileService } from '../../services/profile.service';
import { selectProfileId, selectTweetsAndRepliesLoaded, selectCurrentRepliesPage } from '../../store/selectors/profile.selectors';
import { firstValueFrom } from 'rxjs';
import { setTweetsAndRepliesLoaded, setCurrentRepliesPage } from '../../store/actions/profile.actions';
import { User } from '@app/modules/auth/interfaces/user.interface';

@Component({
  selector: 'app-tweets-replies-timeline',
  templateUrl: './tweets-replies-timeline.component.html',
  styles: [
  ]
})
export class TweetsRepliesTimelineComponent implements OnInit {

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
		this.getProfileTweetsAndReplies()
	}
	
	async getProfileTweetsAndReplies() {
		const userId: any = await firstValueFrom(this.store.select(selectProfileId))
		const tweetsLoaded: Tweet[] = await firstValueFrom(this.store.select(selectTweetsAndRepliesLoaded))
		const currentPage: number = await firstValueFrom(this.store.select(selectCurrentRepliesPage))
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
			const response: any = await firstValueFrom(this.profileService.getUserTweetsAndRepliesTimeline(userId!, this.page))
			this.tweets = response.data
			this.store.dispatch(setTweetsAndRepliesLoaded({ tweets: this.tweets }))
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
			const { data } = await firstValueFrom(this.profileService.getUserTweetsAndRepliesTimeline(this.userId, page))
			if (data.length == 0) {
				this.noMoreTweetsToLoad = true;
				this.loadingMoreTweets = false
				return;
			}
			this.tweets = this.tweets.concat(data)
			this.store.dispatch(setTweetsAndRepliesLoaded({tweets: this.tweets}))
			this.store.dispatch(setCurrentRepliesPage({page}))
			
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
		
		const title = `Tweets with replies by ${nameCapitalized} (@${user.username}) / Twitter`
		document.title = title
	}

}
