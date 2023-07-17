import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FollowButtonComponent } from './components/follow-button/follow-button.component';


@NgModule({
	declarations: [
		FollowButtonComponent
	],
  imports: [
    CommonModule
	],
	exports: [
		FollowButtonComponent
	]
})
export class FriendshipModule { }
