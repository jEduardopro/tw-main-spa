import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../store/app.reducers';
import { firstValueFrom } from 'rxjs';
import { ProfileService } from '../../services/profile.service';
import { selectTweetsLoaded, selectCurrentPage } from '../../store/selectors/profile.selectors';
import { CustomizeViewService } from '../../../customize-view/services/customize-view.service';
import { Tweet } from '@app/modules/tweets/interfaces/tweet.interface';
import { setTweetsLoaded, setCurrentPage } from '../../store/actions/profile.actions';
import { User } from '@app/modules/auth/interfaces/user.interface';
import { TweetService } from '@app/modules/tweets/services/tweet.service';
import { ToastService } from '@app/shared/services/toast.service';
import { selectAuthUserId } from '@app/modules/auth/store/selectors/auth.selectors';

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
	replyModal = false
	tweetToAddReply: Tweet | null = null
	
	constructor(
		public customizeView: CustomizeViewService,
		private store: Store<AppState>,
		private profileService: ProfileService,
		private tweetService: TweetService,
		private toastService: ToastService
	) { }

	ngOnInit(): void {
		this.getProfileTweets()
	}
	
	async getProfileTweets() {
		const userId: any = await firstValueFrom(this.store.select(selectAuthUserId))
		const tweetsLoaded: Tweet[] = await firstValueFrom(this.store.select(selectTweetsLoaded))
		const currentPage: number = await firstValueFrom(this.store.select(selectCurrentPage))
		if (tweetsLoaded.length > 0 && tweetsLoaded[0].owner.id == userId) {
			this.tweets = JSON.parse(JSON.stringify(tweetsLoaded))
			this.page = currentPage
			this.userId = userId
			this.setTitleDocument(tweetsLoaded[0].owner)
			return;
		}
		this.userId = userId
		
		this.loading = true;
		
		try {
			const {data} = await firstValueFrom(this.profileService.getUserTweetsTimeline(userId!, this.page))
			this.tweets = data
			this.store.dispatch(setTweetsLoaded({ tweets: JSON.parse(JSON.stringify(data)) }))
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
			
			this.store.dispatch(setTweetsLoaded({tweets: JSON.parse(JSON.stringify(this.tweets))}))
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

	openReplyModal(tweetId: string) {		
		const tweetFound = this.tweets.find(tweet => tweet.id == tweetId)
		if (!tweetFound) return;
		this.tweetToAddReply = tweetFound
		this.replyModal = true;
	}

	closeReplyModal() {
		this.replyModal = false
		this.tweetToAddReply = null
	}

	async createReply(tweet: Tweet) {
		try {
			this.tweetToAddReply!.replies_count++
			this.store.dispatch(setTweetsLoaded({ tweets: JSON.parse(JSON.stringify(this.tweets)) }))
			this.replyModal = false
			const { message } = await firstValueFrom(this.tweetService.reply(this.tweetToAddReply!.id, tweet.id))
			this.tweetToAddReply = null
			this.toastService.toastSuccess({
				title: message
			})
		} catch (error) {
			
		}
	}

	removeRetweet(tweetId: string) {
		if (this.tweets.filter(tweet => tweet.id == tweetId).length === 1) {
			return;
		}
			
		const tweetIndex = this.tweets.findIndex(tweet => tweet.id == tweetId)
		if (tweetIndex == -1) {
			return;
		}
		this.tweets.splice(tweetIndex, 1)
		const tweetFound = this.tweets.find(tweet => tweet.id == tweetId)
		if (tweetFound) {
			tweetFound.retweeted = false;
			tweetFound.retweets_count--;
		}
		this.store.dispatch(setTweetsLoaded({tweets: JSON.parse(JSON.stringify(this.tweets))}))
	}

	removeTweet(tweetId: string) {
		const tweetIndex = this.tweets.findIndex(tweet => tweet.id == tweetId)
		if (tweetIndex == -1) return;
		this.tweets.splice(tweetIndex, 1)
		this.store.dispatch(setTweetsLoaded({tweets: JSON.parse(JSON.stringify(this.tweets))}))
	}

}
