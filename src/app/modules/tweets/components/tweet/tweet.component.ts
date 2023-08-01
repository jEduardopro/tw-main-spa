import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Tweet } from '../../interfaces/tweet.interface';
import { TimeagoIntl } from 'ngx-timeago';
import { strings as englishStrings } from 'ngx-timeago/language-strings/en';
import { Store } from '@ngrx/store';
import { AppState } from '@app/store/app.reducers';
import { CustomizeViewService } from '@app/modules/customize-view/services/customize-view.service';

@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styles: [
  ]
})
export class TweetComponent{

	@Input() tweet!: Tweet
	@Output() tweetDeleted = new EventEmitter<string>()
	@Output() removeRetweet = new EventEmitter<string>()
	@Output() openReplyModal = new EventEmitter<string>()


	constructor(
		intl: TimeagoIntl,
		public customizeView: CustomizeViewService,
	) {
    intl.strings = englishStrings;
    intl.changes.next();
  }
}
