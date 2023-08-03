import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Tweet } from '@app/modules/tweets/interfaces/tweet.interface';
import { TweetService } from '@app/modules/tweets/services/tweet.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styles: [
  ]
})
export class StatusComponent implements OnInit {

	tweetId: string = ''
	tweet: Tweet | null = null;

	constructor(
		private route: ActivatedRoute,
		private tweetService: TweetService
	) { }

	ngOnInit(): void {
		this.route.params.subscribe(params => {
			this.tweetId = params['tweet']
			this.getTweet()
		})
	}

	async getTweet() {
		try {
			const data = await firstValueFrom(this.tweetService.getTweet(this.tweetId))
			console.log(data);
			this.tweet = data
			
		} catch (error) {
			console.log(error);
		}
	}

}
