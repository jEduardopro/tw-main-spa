import { Component, OnDestroy, OnInit } from '@angular/core';
import { Tweet } from '@app/modules/tweets/interfaces/tweet.interface';
import { firstValueFrom, Subscription } from 'rxjs';
import { TimelineService } from '../../services/timeline.service';
import { CustomizeViewService } from '../../../customize-view/services/customize-view.service';
import { PusherEchoService } from '../../../../core/services/pusher-echo.service';
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
		private pusherEchoService: PusherEchoService,
		private store: Store<AppState>
	) {	}

	ngOnInit(): void {
		this.loadHomeTimeline()

		const userId$ = this.store.select(selectAuthUserId).subscribe(userId => {
			this.userId = userId
		})

		this.pusherEchoService.listenPrivateNotification(`users.${this.userId}`)

		this.pusherEchoService.pusherNotifications.subscribe((notification: any) => {
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
			const response = await firstValueFrom(this.timelineService.getHomeTimeline(this.page))
			this.tweets = response.data
			
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
			this.tweets.push(...data)
			
		} catch (error) {
			console.log(error);
		}
		this.loadingMoreTweets = false;
	}
	
	insertNewTweetToHomeTimeline(tweet: Tweet) {
		this.tweets.unshift(tweet)
	}

}
