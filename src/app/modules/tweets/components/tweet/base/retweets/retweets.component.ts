import { Component, OnInit, Input } from '@angular/core';
import { Tweet } from '@app/modules/tweets/interfaces/tweet.interface';

@Component({
  selector: 'app-retweets',
  templateUrl: './retweets.component.html',
  styles: [
  ]
})
export class RetweetsComponent implements OnInit {

	@Input() tweet!: Tweet

  constructor() { }

  ngOnInit(): void {
	}
	
	retweet() {
		console.log('Retweet');
	}

	undoRetweet() {
		console.log('Undo Retweet');
	}

}
