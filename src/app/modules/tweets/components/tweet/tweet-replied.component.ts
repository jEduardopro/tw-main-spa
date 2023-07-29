import { Component, Input } from '@angular/core';
import { Tweet } from '../../interfaces/tweet.interface';

@Component({
  selector: 'app-tweet-replied',
  templateUrl: './tweet-replied.component.html',
  styles: [
  ]
})
export class TweetRepliedComponent {

	@Input() tweet!: Tweet;

}
