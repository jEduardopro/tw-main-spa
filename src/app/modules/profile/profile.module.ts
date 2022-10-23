import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './components/profile/profile.component';
import { BannerComponent } from './components/banner/banner.component';
import { AvatarPreviewComponent } from './components/avatar-preview/avatar-preview.component';
import { TweetTabsComponent } from './components/tweet-tabs/tweet-tabs.component';
import { ProfileRoutingModule } from './profile.routing.module';
import { SharedModule } from '../../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { profileFeatureKey, profileReducer } from './store/reducers/profile.reducer';
import { TweetsTimelineComponent } from './components/tweets-timeline/tweets-timeline.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { TweetsModule } from '../tweets/tweets.module';
import { TweetsRepliesTimelineComponent } from './components/tweets-replies-timeline/tweets-replies-timeline.component';



@NgModule({
  declarations: [
    ProfileComponent,
    BannerComponent,
		AvatarPreviewComponent,
		TweetTabsComponent,
		TweetsTimelineComponent,
		TweetsRepliesTimelineComponent,
  ],
  imports: [
		CommonModule,
		SharedModule,
		StoreModule.forFeature(profileFeatureKey, profileReducer),
		TweetsModule,
		ProfileRoutingModule,
		InfiniteScrollModule,
  ]
})
export class ProfileModule { }
