import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Profile } from '@app/modules/profile/interfaces/profile.interface';

@Component({
  selector: 'app-profile-item',
  templateUrl: './profile-item.component.html',
  styles: []
})
export class ProfileItemComponent {

	@Input() profile!: Profile
	@Output() follow = new EventEmitter<{id: string, value: boolean}>()

	setFollow(id: string, value: boolean) {
		this.follow.emit({id, value})
	}
}