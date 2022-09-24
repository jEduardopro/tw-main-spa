import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewTweetComponent } from './components/new-tweet/new-tweet.component';
import { MentionModule } from 'angular-mentions';
import { SharedModule } from '@app/shared';



@NgModule({
	declarations: [
		NewTweetComponent
	],
  imports: [
		CommonModule,
		MentionModule,
		SharedModule
	],
	exports: [
		NewTweetComponent
	]
})
export class TweetsModule { }
