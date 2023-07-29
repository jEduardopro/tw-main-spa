import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Tweet } from '@app/modules/tweets/interfaces/tweet.interface';

@Component({
  selector: 'app-counters',
  templateUrl: './counters.component.html',
  styles: [
  ]
})
export class CountersComponent {

	@Input() tweet!: Tweet;
	@Output() removeRetweet = new EventEmitter<string>()
	@Output() openReplyModal = new EventEmitter<string>()

}
