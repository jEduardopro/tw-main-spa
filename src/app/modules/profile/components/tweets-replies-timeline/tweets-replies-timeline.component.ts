import { Component, OnInit } from '@angular/core';
import { CustomizeViewService } from '@app/modules/customize-view/services/customize-view.service';
import { Tweet } from '@app/modules/tweets/interfaces/tweet.interface';
import { AppState } from '@app/store/app.reducers';
import { Store } from '@ngrx/store';
import { ProfileService } from '../../services/profile.service';
import { selectTweetsAndRepliesLoaded, selectCurrentRepliesPage } from '../../store/selectors/profile.selectors';
import { firstValueFrom } from 'rxjs';
import { setTweetsAndRepliesLoaded, setCurrentRepliesPage, setTweetsLoaded } from '../../store/actions/profile.actions';
import { User } from '@app/modules/auth/interfaces/user.interface';
import { TweetService } from '@app/modules/tweets/services/tweet.service';
import { ToastService } from '@app/shared/services/toast.service';
import { selectAuthUserId } from '@app/modules/auth/store/selectors/auth.selectors';

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
		this.getProfileTweetsAndReplies()
	}
	
	async getProfileTweetsAndReplies() {
		const userId: any = await firstValueFrom(this.store.select(selectAuthUserId))
		const tweetsLoaded: Tweet[] = await firstValueFrom(this.store.select(selectTweetsAndRepliesLoaded))
		const currentPage: number = await firstValueFrom(this.store.select(selectCurrentRepliesPage))
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
			const { data } = await firstValueFrom(this.profileService.getUserTweetsAndRepliesTimeline(userId!, this.page))
			const tweetsAndRepliesGrouped = this.getTweetsAndRepliesGrouped(data)
			this.tweets = tweetsAndRepliesGrouped
			this.store.dispatch(setTweetsAndRepliesLoaded({ tweets: JSON.parse(JSON.stringify(tweetsAndRepliesGrouped)) }))
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
			const tweetsAndRepliesGrouped = this.getTweetsAndRepliesGrouped(data)
			this.tweets = this.tweets.concat(tweetsAndRepliesGrouped)
			this.store.dispatch(setTweetsAndRepliesLoaded({tweets: JSON.parse(JSON.stringify(this.tweets))}))
			this.store.dispatch(setCurrentRepliesPage({page}))
			
		} catch (error) {
			console.log(error);
		}
		this.loadingMoreTweets = false;
	}

	getTweetsAndRepliesGrouped(twees: Tweet[]) {
		const replies: string[] = []
		const intialState: Tweet[] = []
		return twees.reduce((acc, tweet) => {
			
			if (tweet.reply_to && replies.includes(tweet.reply_to.id)) {
				return acc;
			}
			if (tweet.reply_to && !replies.includes(tweet.reply_to.id)) {
				replies.push(tweet.reply_to.id)
			}
			acc.push(tweet)
			return acc
		}, intialState)
	}

	setTitleDocument(user: User) {
		const nameCapitalized = user.name.split(' ').reduce((acc, state) => {
			acc += state.charAt(0).toUpperCase() + state.slice(1) + ' '
			return acc
		}, '').trimEnd()
		
		const title = `Tweets with replies by ${nameCapitalized} (@${user.username}) / Twitter`
		document.title = title
	}

	openReplyModal(tweetId: string) {		
		let tweetFound = this.tweets.find(tweet => tweet.id == tweetId)

		if (tweetFound) {
			this.tweetToAddReply = tweetFound
			this.replyModal = true;
			return;
		}

		tweetFound = this.tweets.filter(tweet => tweet.reply_to).find(tweet => tweet.reply_to!.id == tweetId)
				
		if (!tweetFound) return;
		this.tweetToAddReply = tweetFound.reply_to!
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
			console.log(error);
			
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
		const tweetIndex = this.tweets.findIndex(tweet => tweet.id == tweetId || tweet.reply_to?.id == tweetId)
		if (tweetIndex == -1) return;
		this.tweets.splice(tweetIndex, 1)
		this.store.dispatch(setTweetsLoaded({tweets: JSON.parse(JSON.stringify(this.tweets))}))
	}

}
