import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { selectAuthUserId } from '@app/modules/auth/store/selectors/auth.selectors';
import { Profile } from '@app/modules/profile/interfaces/profile.interface';
import { AppState } from '@app/store/app.reducers';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile-item',
  templateUrl: './profile-item.component.html',
  styles: []
})
export class ProfileItemComponent implements OnInit, OnDestroy {

	@Input() profile!: Profile
	@Output() follow = new EventEmitter<{ id: string, value: boolean }>()

	userId = ''
	storeSubscription: Subscription = new Subscription
	
	constructor(
		private store: Store<AppState>
	) { }

	ngOnInit(): void {
		const userId$ = this.store.select(selectAuthUserId).subscribe(id => {
			this.userId = id
		})

		this.storeSubscription.add(userId$)
	}

	ngOnDestroy(): void {
		this.storeSubscription.unsubscribe()
	}

	get isAuthUser() {
		return this.userId === this.profile.id
	}

	setFollow(id: string, value: boolean) {
		this.follow.emit({id, value})
	}
}