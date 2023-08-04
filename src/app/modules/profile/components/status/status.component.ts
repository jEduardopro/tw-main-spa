import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Tweet } from '@app/modules/tweets/interfaces/tweet.interface';
import { TweetService } from '@app/modules/tweets/services/tweet.service';
import { AppState } from '@app/store/app.reducers';
import { Store } from '@ngrx/store';
import { Subscription, firstValueFrom } from 'rxjs';
import { selectProfileUsername } from '../../store/selectors/profile.selectors';
import { NavigationService } from '@app/core/services/navigation.service';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styles: [
  ]
})
export class StatusComponent implements OnInit, OnDestroy {

	tweetId: string = ''
	tweet: Tweet | null = null;
	replies: Tweet[] = []
	page = 1;
	username: string| null = null
	storeSubscription: Subscription = new Subscription
	waitingResponse = false
	loadingReplies = false
	loadingMoreReplies = false
	noMoreRepliesToLoad = false
	replyModal = false
	tweetToAddReply: Tweet | null = null

	constructor(
		private navigationService: NavigationService,
		private store: Store<AppState>,
		private route: ActivatedRoute,
		private router: Router,
		private tweetService: TweetService
	) {}

	ngOnInit(): void {
		const username$ = this.store.select(selectProfileUsername).subscribe(username => {
			this.username = username || null
		})
		this.storeSubscription.add(username$)

		this.route.params.subscribe(params => {
			this.resetData()
			this.tweetId = params['tweet']
			this.getData()
		})
	}

	ngOnDestroy(): void {
		this.storeSubscription.unsubscribe()
	}

	resetData() {
		this.tweetId = ''
		this.tweet = null
		this.replies = []
		this.page = 1
	}

	async getData() {
		await this.getTweet()
		this.getTweetReplies()
	}

	async getTweet() {
		if (!this.tweetId || this.waitingResponse) return;
		this.waitingResponse = true
		try {
			const data = await firstValueFrom(this.tweetService.getTweet(this.tweetId))
			this.tweet = data
			this.shouldResolveUsername()
			
		} catch (error) {
			console.log(error);
		}
		this.waitingResponse = false
	}

	shouldResolveUsername() {
		if (this.username !== null) return;		
		this.router.navigate(['/', this.tweet?.owner.username, 'status', this.tweetId])
	}

	async getTweetReplies() {
		if (!this.tweet) return;
		this.loadingReplies = true
		
		try {
			const {data} = await firstValueFrom(this.tweetService.getTweetReplies(this.tweetId))
			this.replies = data
			
		} catch (error) {
			
		}
		this.loadingReplies = false
	}

	async onScroll() {
		if (this.noMoreRepliesToLoad) {
			return;
		}
		this.loadingMoreReplies = true;
		try {
			const page = ++this.page;
			const { data } = await firstValueFrom(this.tweetService.getTweetReplies(this.tweetId, page))
			if (data.length == 0) {
				this.noMoreRepliesToLoad = true;
				this.loadingMoreReplies = false
				return;
			}			
			this.replies.push(...data)
			
		} catch (error) {
			console.log(error);
		}
		this.loadingMoreReplies = false;
	}

	openReplyModal(tweetId: string) {		
		if (tweetId == this.tweetId) {
			this.tweetToAddReply = this.tweet
			this.replyModal = true;
			return
		}
		
		const tweetFound = this.replies.find(tweet => tweet.id == tweetId)
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
			this.replyModal = false
			await firstValueFrom(this.tweetService.reply(this.tweetToAddReply!.id, tweet.id))
			this.tweetToAddReply = null
			this.getTweetReplies()
		} catch (error) {
			
		}
	}

	removeTweet(tweetId: string) {
		const tweetIndex = this.replies.findIndex(tweet => tweet.id == tweetId)
		if (tweetIndex == -1) return;
		this.replies.splice(tweetIndex, 1)
	}

	goToBack() {
		this.navigationService.back()
	}

}
