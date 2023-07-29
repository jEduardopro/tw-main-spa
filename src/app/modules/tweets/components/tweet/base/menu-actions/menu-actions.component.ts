import { Component, Input } from '@angular/core';
import { selectAuthUserId } from '@app/modules/auth/store/selectors/auth.selectors';
import { CustomizeViewService } from '@app/modules/customize-view/services/customize-view.service';
import { Tweet } from '@app/modules/tweets/interfaces/tweet.interface';
import { AppState } from '@app/store/app.reducers';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-menu-actions',
  templateUrl: './menu-actions.component.html',
  styles: [
  ]
})
export class MenuActionsComponent {

	@Input() tweet!: Tweet;

	userId: string = ''
	storeSubscription: Subscription = new Subscription

	constructor(
		public customizeView: CustomizeViewService,
		private store: Store<AppState>
	) {
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
