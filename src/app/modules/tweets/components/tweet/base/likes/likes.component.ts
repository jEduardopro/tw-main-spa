import { Component, Input, OnInit } from '@angular/core';
import { Tweet } from '@app/modules/tweets/interfaces/tweet.interface';
import { TweetService } from '@app/modules/tweets/services/tweet.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-likes',
  templateUrl: './likes.component.html',
  styles: [
  ]
})
export class LikesComponent implements OnInit {

	@Input() tweet!: Tweet

	constructor(
		private tweetService: TweetService
	) { }

	ngOnInit(): void {
		window.Echo.channel(`tweets.${this.tweet.id}.likes`).listen('ModelLiked', (event: any) => {
			console.log('Tweet like Event: ', event);
			++this.tweet.likes_count
		})
		window.Echo.channel(`tweets.${this.tweet.id}.likes`).listen('ModelUnliked', (event: any) => {
			console.log('Tweet unlike Event: ', event);
			--this.tweet.likes_count
		})
	}
	
	async sendLike() {
		try {
			++this.tweet.likes_count
			this.tweet.liked = true;
			const response = await firstValueFrom( this.tweetService.like( this.tweet.id ) )
			console.log('Like response', response);
			
		} catch (error) {
			
		}
	}

	async unlike() {
		try {
			--this.tweet.likes_count
			this.tweet.liked = false
			const response = await firstValueFrom( this.tweetService.unlike( this.tweet.id ) )
		} catch (error) {
			
		}
	}

}
