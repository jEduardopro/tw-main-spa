import { Component, OnDestroy, OnInit } from '@angular/core';
import { Tweet } from '@app/modules/tweets/interfaces/tweet.interface';
import { firstValueFrom, Subscription } from 'rxjs';
import { TimelineService } from '../../services/timeline.service';
import { CustomizeViewService } from '../../../customize-view/services/customize-view.service';
import { Store } from '@ngrx/store';
import { AppState } from '@app/store/app.reducers';
import { selectAuthUserId } from '../../../auth/store/selectors/auth.selectors';
import { setTweetsLoaded } from '@app/modules/profile/store/actions/profile.actions';
import { TweetService } from '@app/modules/tweets/services/tweet.service';
import { ToastService } from '@app/shared/services/toast.service';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
	styles: [
		`
			:host {
				display:flex;
				flex-direction: column;
				flex-grow:1;
				position:relative;
			}
		`
	],
})
export class TimelineComponent implements OnInit, OnDestroy {

	tweets: Tweet[] = [];
	page = 1;
	waitingResponse = false
	loadingMoreTweets = false
	replyModal = false
	tweetToAddReply: Tweet | null = null

	storeSubscription: Subscription = new Subscription
	userId: string = ''

	constructor(
		private timelineService: TimelineService,
		public customizeView: CustomizeViewService,
		private store: Store<AppState>,
		private tweetService: TweetService,
		private toastService: ToastService
	) {	}

	ngOnInit(): void {
		this.loadHomeTimeline()

		const userId$ = this.store.select(selectAuthUserId).subscribe(userId => {
			this.userId = userId
		})

		window.Echo.private(`users.${this.userId}`).notification((notification: any) => {
			console.log('timeline notification');
			if (notification.type !== 'tweet.added') {
				return;
			}
			
			let tweetNotification = JSON.parse(JSON.stringify(notification))
			delete tweetNotification.type
			const tweet: Tweet = tweetNotification
			this.insertNewTweetToHomeTimeline(tweet)
		})

		this.storeSubscription.add(userId$)
	}

	ngOnDestroy(): void {
		this.storeSubscription.unsubscribe()
	}

	async loadHomeTimeline() {
		this.waitingResponse = true;
		try {
			const {data} = await firstValueFrom(this.timelineService.getHomeTimeline(this.page))
			this.tweets = this.getTweetsAndRepliesGrouped(data)
			
		} catch (error) {
			console.log(error);
		}
		this.waitingResponse = false;
	}

	async onScroll() {
		console.log("scrolled!! timeline home");
		this.loadingMoreTweets = true;
		try {
			const {data} = await firstValueFrom(this.timelineService.getHomeTimeline(++this.page))
			this.tweets.push(...this.getTweetsAndRepliesGrouped(data))
			
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
	
	insertNewTweetToHomeTimeline(tweet: Tweet) {
		this.tweets.unshift(tweet)
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

	removeTweet(tweetId: string) {
		const tweetIndex = this.tweets.findIndex(tweet => tweet.id == tweetId || tweet.reply_to?.id == tweetId)
		if (tweetIndex == -1) return;
		this.tweets.splice(tweetIndex, 1)
	}

}
