import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { selectAuthUserImage, selectAuthUsername } from '@app/modules/auth/store/selectors/auth.selectors';
import { CustomizeViewService } from '@app/modules/customize-view/services/customize-view.service';
import { AppState } from '@app/store/app.reducers';
import { Store } from '@ngrx/store';
import { firstValueFrom, Subscription } from 'rxjs';
import { PeopleMentioned } from '../../interfaces/people-mentioned.interface';
import { TweetPayload } from '../../interfaces/tweet-payload.interface';
import { TweetService } from '../../services/tweet.service';
import { Image } from '../../../auth/interfaces/user.interface';
import { Tweet } from '../../interfaces/tweet.interface';

@Component({
	selector: 'app-new-tweet',
	templateUrl: './new-tweet.component.html',
	styles: [
	]
})
export class NewTweetComponent implements OnInit, OnDestroy {

	tweet = '';
	media: string[] = [];
	peopleMentioned: PeopleMentioned[] = [];

	waitingResponse = false;

	authUserImage: Image | null = null;
	authUsername: string | null = null;
	storeSubscription: Subscription = new Subscription;
	
	@Output() tweetCreated = new EventEmitter<Tweet>()
	@Output() creating = new EventEmitter<boolean>()

	constructor(
		public customizeViewService: CustomizeViewService,
		private tweetService: TweetService,
		private store: Store<AppState>
	) { }

	ngOnInit(): void {
		const authUserImage$ = this.store.select(selectAuthUserImage).subscribe(image => {
			this.authUserImage = image
		})
		const username$ = this.store.select(selectAuthUsername).subscribe(username => {
			this.authUsername = username
		})

		this.storeSubscription.add(authUserImage$)
		this.storeSubscription.add(username$)
	}

	ngOnDestroy(): void {
		this.storeSubscription.unsubscribe()
	}
	
	updateTweet(event: Event) {
		const target = event.target as HTMLElement
		this.tweet = target.innerText

		this.syncMentions()
	}

	updateMedia(media: string[] = []) {
		this.media = media
	}

	async saveTweet() {
		this.waitingResponse = true
		this.creating.emit(true)
		try {
			let newTweet: TweetPayload = this.buildTweetPayload()
			const tweetResponse = await firstValueFrom(this.tweetService.postTweet(newTweet))
			// console.log({tweetResponse});
			this.tweetCreated.emit(tweetResponse)
			this.clearTweetData()
		} catch (error) {
			
		}
		this.waitingResponse = false
		this.creating.emit(false)
	}

	private buildTweetPayload(): TweetPayload {
		let tweet: TweetPayload = {
			body: this.tweet
		}

		if (this.peopleMentioned.length > 0) {
			tweet.mentions = this.peopleMentioned.map(p => p.id)
		}
		if (this.media.length > 0) {
			tweet.media = this.media
		}
		return tweet
	}

	private clearTweetData() {
		const tweetBodyEditable = document.getElementById('tweetBody')
		if (tweetBodyEditable) {
			tweetBodyEditable.innerHTML = ''
			tweetBodyEditable.innerText = ''
		}
		this.tweet = ''
		this.media = []
		this.peopleMentioned = []
	}

	syncMentions() {
		this.peopleMentioned.map(u => u.username).forEach(userName => {
			if (!this.tweet.includes(userName)) {	
				this.peopleMentioned = this.peopleMentioned.filter(u => u.username != userName)
			}
		})
	}

	saveMention(user: any) {
		this.peopleMentioned.push({username: `@${user.username}`, id: user.id})
	}

}