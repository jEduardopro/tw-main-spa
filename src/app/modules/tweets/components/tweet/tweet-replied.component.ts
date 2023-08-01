import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Tweet } from '../../interfaces/tweet.interface';

@Component({
  selector: 'app-tweet-replied',
  templateUrl: './tweet-replied.component.html',
  styles: [
  ]
})
export class TweetRepliedComponent {

	@Input() tweet!: Tweet;
	@Output() tweetDeleted = new EventEmitter<string>()
	@Output() removeRetweet = new EventEmitter<string>()
	@Output() openReplyModal = new EventEmitter<string>()

}
