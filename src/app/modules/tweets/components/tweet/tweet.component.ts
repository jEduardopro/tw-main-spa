import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Tweet } from '../../interfaces/tweet.interface';
import { TimeagoIntl } from 'ngx-timeago';
import { strings as englishStrings } from 'ngx-timeago/language-strings/en';
import { Store } from '@ngrx/store';
import { AppState } from '@app/store/app.reducers';
import { Subscription } from 'rxjs';
import { selectAuthUserId } from '../../../auth/store/selectors/auth.selectors';
import { CustomizeViewService } from '@app/modules/customize-view/services/customize-view.service';

@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styles: [
  ]
})
export class TweetComponent implements OnInit, OnDestroy{

	@Input() tweet!: Tweet

	userId: string = ''
	storeSubscription: Subscription = new Subscription

	constructor(
		intl: TimeagoIntl,
		public customizeView: CustomizeViewService,
		private store: Store<AppState>
	) {
    intl.strings = englishStrings;
    intl.changes.next();
  }

	ngOnInit(): void {
		const userId$ = this.store.select(selectAuthUserId).subscribe(userId => this.userId = userId)

		this.storeSubscription.add(userId$)
	}
	
	ngOnDestroy(): void {
		this.storeSubscription.unsubscribe()	
	}

	get tweetMenuShouldBeVisible() {return this.userId === this.tweet.owner.id}
}
