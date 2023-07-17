import { Component, EventEmitter, Input, Output } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { FriendshipService } from '../../services/friendship.service';

@Component({
  selector: 'app-follow-button',
  templateUrl: './follow-button.component.html',
  styles: [
  ]
})
export class FollowButtonComponent {

	@Input() following!: boolean
	@Input() user_id!: string

	@Output() follow = new EventEmitter<boolean>()

	followHover = false
	changingStatus = false

	constructor(
		private friendshipService: FriendshipService
	)
	{ }

	get followText() {
		if (this.following && !this.followHover) {
			return 'Following'
		}
		if (this.following && this.followHover) {
			return 'Unfollow'
		}
		return 'Follow'
	}

	get followClasses() {
		if (!this.following) {
			return 'bg-black text-white dark:bg-white dark:text-black hover:bg-[#272C30] hover:dark:bg-[#D7DBDC]'
		}
		return `bg-white dark:bg-black border border-[#D1D9DC] dark:border-[#526371]
		text-black dark:text-white hover:bg-red-50 hover:border-red-200 hover:text-red-500
		 hover:dark:border-red-500 hover:dark:text-red-500
		`
	}

	async toggleFollow() {
		if (this.changingStatus) {
			return
		}
		this.changingStatus = true
		try {
			const response = this.following ? await firstValueFrom(this.friendshipService.unfollow(this.user_id))
																			: await firstValueFrom(this.friendshipService.follow(this.user_id))
			console.log(response);
			this.follow.emit(!this.following)				
		} catch (error) {
			console.log(error);
		}
		this.changingStatus = false
	}
}
