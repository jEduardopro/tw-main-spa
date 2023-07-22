import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CustomizeViewService } from '@app/modules/customize-view/services/customize-view.service';
import { AppState } from '@app/store/app.reducers';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { selectProfileUsername } from '../../store/selectors/profile.selectors';

@Component({
  selector: 'app-follow-tabs',
  templateUrl: './follow-tabs.component.html',
  styles: [
  ]
})
export class FollowTabsComponent implements OnInit, OnDestroy {

	@Input() currentTab: 'followers' | 'following' = 'followers'

	profileUsername: string = ''
	storeSubscription: Subscription = new Subscription

	constructor(
		public customizeView: CustomizeViewService,
		private store: Store<AppState>
	) { }
	
	ngOnInit(): void {
		const profileUsername$ = this.store.select(selectProfileUsername).subscribe(username => {
			this.profileUsername = username || ''
		})

		this.storeSubscription.add(profileUsername$)
	}

	ngOnDestroy(): void {
		this.storeSubscription.unsubscribe()
	}

}
