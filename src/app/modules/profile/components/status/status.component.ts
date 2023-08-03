import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Tweet } from '@app/modules/tweets/interfaces/tweet.interface';
import { TweetService } from '@app/modules/tweets/services/tweet.service';
import { AppState } from '@app/store/app.reducers';
import { Store } from '@ngrx/store';
import { Subscription, firstValueFrom } from 'rxjs';
import { selectProfileUsername } from '../../store/selectors/profile.selectors';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styles: [
  ]
})
export class StatusComponent implements OnInit, OnDestroy {

	tweetId: string = ''
	tweet: Tweet | null = null;
	username: string| null = null
	storeSubscription: Subscription = new Subscription

	constructor(
		private store: Store<AppState>,
		private route: ActivatedRoute,
		private tweetService: TweetService
	) { }

	ngOnInit(): void {
		const username$ = this.store.select(selectProfileUsername).subscribe(username => {
			this.username = username || null
		})
		this.storeSubscription.add(username$)

		this.route.params.subscribe(params => {
			this.tweetId = params['tweet']
			this.getTweet()
		})
	}

	ngOnDestroy(): void {
		this.storeSubscription.unsubscribe()
	}

	async getTweet() {
		try {
			const data = await firstValueFrom(this.tweetService.getTweet(this.tweetId))
			console.log(data);
			this.tweet = data
			this.shouldResolveUsername()
			
		} catch (error) {
			console.log(error);
		}
	}

	shouldResolveUsername() {
		if (this.username !== null) return;

	}

}
