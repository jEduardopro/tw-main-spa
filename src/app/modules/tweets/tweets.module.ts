import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewTweetComponent } from './components/new-tweet/new-tweet.component';
import { MentionModule } from 'angular-mentions';
import { SharedModule } from '@app/shared';
import { TextBoxComponent } from './components/new-tweet/base/text-box/text-box.component';
import { ButtonActionsComponent } from './components/new-tweet/base/button-actions/button-actions.component';
import { TweetComponent } from './components/tweet/tweet.component';
import { TimeagoClock, TimeagoCustomFormatter, TimeagoFormatter, TimeagoIntl, TimeagoModule } from 'ngx-timeago';
import { LikesComponent } from './components/tweet/base/likes/likes.component';
import { RepliesComponent } from './components/tweet/base/replies/replies.component';
import { RetweetsComponent } from './components/tweet/base/retweets/retweets.component';
import { RouterModule } from '@angular/router';
import { MediaComponent } from './components/tweet/base/media/media.component';
import { FormatTweetContentPipe } from './pipes/format-tweet-content.pipe';



@NgModule({
	declarations: [
		NewTweetComponent,
		TextBoxComponent,
		ButtonActionsComponent,
		TweetComponent,
		LikesComponent,
		RepliesComponent,
		RetweetsComponent,
		MediaComponent,
		FormatTweetContentPipe
	],
  imports: [
		CommonModule,
		MentionModule,
		RouterModule,
		TimeagoModule.forChild({
			formatter: {provide: TimeagoFormatter, useClass: TimeagoCustomFormatter}
		}),
		SharedModule
	],
	exports: [
		NewTweetComponent,
		TweetComponent
	],
	providers: [TimeagoIntl],
})
export class TweetsModule { }
