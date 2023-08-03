import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Tweet } from '@app/modules/tweets/interfaces/tweet.interface';

@Component({
  selector: 'app-replies',
  templateUrl: './replies.component.html',
  styles: [
  ]
})
export class RepliesComponent implements OnInit {

	@Input() tweet!: Tweet
	@Input() layout: 'status'|'tweet' = 'tweet'
	@Output() openReplyModal = new EventEmitter<string>()

  constructor() { }

  ngOnInit(): void {
	}
	
	emitOpenReplyModal(event: Event) {
		event.stopPropagation()
		this.openReplyModal.emit(this.tweet.id)
	}

}
