import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Tweet } from '../../interfaces/tweet.interface';

@Component({
  selector: 'app-new-reply',
  templateUrl: './new-reply.component.html',
  styles: [
  ]
})
export class NewReplyComponent {

	@Input() tweet!: Tweet;
	@Output() close = new EventEmitter();
	@Output() tweetCreated = new EventEmitter<Tweet>();
	creatingReply = false;

	closeModal() {
		if (this.creatingReply) return;
			
		this.close.emit()
	}

}
