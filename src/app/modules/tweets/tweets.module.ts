import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewTweetComponent } from './components/new-tweet/new-tweet.component';
import { MentionModule } from 'angular-mentions';
import { SharedModule } from '@app/shared';
import { TextBoxComponent } from './components/new-tweet/base/text-box/text-box.component';
import { ButtonActionsComponent } from './components/new-tweet/base/button-actions/button-actions.component';
import { TweetComponent } from './components/tweet/tweet.component';



@NgModule({
	declarations: [
		NewTweetComponent,
		TextBoxComponent,
		ButtonActionsComponent,
		TweetComponent
	],
  imports: [
		CommonModule,
		MentionModule,
		SharedModule
	],
	exports: [
		NewTweetComponent,
		TweetComponent
	]
})
export class TweetsModule { }
