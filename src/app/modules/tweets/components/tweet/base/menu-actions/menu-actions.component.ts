import { Component, EventEmitter, Input, Output } from '@angular/core';
import { selectAuthUserId } from '@app/modules/auth/store/selectors/auth.selectors';
import { CustomizeViewService } from '@app/modules/customize-view/services/customize-view.service';
import { Tweet } from '@app/modules/tweets/interfaces/tweet.interface';
import { TweetService } from '@app/modules/tweets/services/tweet.service';
import { ToastService } from '@app/shared/services/toast.service';
import { AppState } from '@app/store/app.reducers';
import { Store } from '@ngrx/store';
import { Subscription, firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-menu-actions',
  templateUrl: './menu-actions.component.html',
  styles: [
  ]
})
export class MenuActionsComponent {

	@Input() tweet!: Tweet;
	@Output() tweetDeleted = new EventEmitter<string>()

	userId: string = ''
	showMenu: boolean = false;
	storeSubscription: Subscription = new Subscription

	constructor(
		public customizeView: CustomizeViewService,
		private store: Store<AppState>,
		private tweetService: TweetService,
		private toastService: ToastService
	) {
  }

	ngOnInit(): void {
		const userId$ = this.store.select(selectAuthUserId).subscribe(userId => this.userId = userId)

		this.storeSubscription.add(userId$)
	}
	
	ngOnDestroy(): void {
		this.storeSubscription.unsubscribe()	
	}

	get tweetMenuShouldBeVisible() { return this.userId === this.tweet.owner.id }

	toggleMenu(event: Event) {
		event.stopPropagation()
		this.showMenu = !this.showMenu
	}
	
	async deleteTweet() {
		try {
			this.tweetDeleted.emit(this.tweet.id)
			const {message} = await firstValueFrom(this.tweetService.deleteTweet(this.tweet.id))
			this.toastService.toastSuccess({ title: message})
			
		} catch (error) {
			console.log(error);
			
		}
	}
}
