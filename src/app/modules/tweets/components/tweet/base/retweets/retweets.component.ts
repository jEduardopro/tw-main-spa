import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Tweet } from '@app/modules/tweets/interfaces/tweet.interface';
import { TweetService } from '@app/modules/tweets/services/tweet.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-retweets',
  templateUrl: './retweets.component.html',
  styles: [
  ]
})
export class RetweetsComponent implements OnInit {

	@Input() tweet!: Tweet
	@Output() removeRetweet = new EventEmitter<string>()

	constructor(
		private tweetService: TweetService
	) { }

	ngOnInit(): void {
		window.Echo.channel(`tweets.${this.tweet.id}.retweets`).listen('TweetRetweeted', (event: any) => {
			console.log('Tweet Retweet Event: ', event);
			++this.tweet.retweets_count
		})
		window.Echo.channel(`tweets.${this.tweet.id}.retweets`).listen('UndoRetweet', (event: any) => {
			console.log('Tweet Undo retweet Event: ', event);
			--this.tweet.retweets_count
		})
	}
	
	async retweet() {
		try {
			++this.tweet.retweets_count
			this.tweet.retweeted = true;
			const data = await firstValueFrom(this.tweetService.retweet(this.tweet.id))
		} catch (error) {
			
		}
	}

	async undoRetweet() {
		try {
			--this.tweet.retweets_count
			this.tweet.retweeted = false;
			this.removeRetweet.emit(this.tweet.id)
			const data = await firstValueFrom(this.tweetService.undoRetweet(this.tweet.id))
		} catch (error) {
			
		}
	}

}
