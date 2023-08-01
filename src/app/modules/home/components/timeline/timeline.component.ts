import { Component, OnDestroy, OnInit } from '@angular/core';
import { Tweet } from '@app/modules/tweets/interfaces/tweet.interface';
import { firstValueFrom, Subscription } from 'rxjs';
import { TimelineService } from '../../services/timeline.service';
import { CustomizeViewService } from '../../../customize-view/services/customize-view.service';
import { Store } from '@ngrx/store';
import { AppState } from '@app/store/app.reducers';
import { selectAuthUserId } from '../../../auth/store/selectors/auth.selectors';

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

	storeSubscription: Subscription = new Subscription
	userId: string = ''

	constructor(
		private timelineService: TimelineService,
		public customizeView: CustomizeViewService,
		private store: Store<AppState>
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

}
