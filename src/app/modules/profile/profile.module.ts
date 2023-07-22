import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './components/profile/profile.component';
import { BannerComponent } from './components/banner/banner.component';
import { AvatarPreviewComponent } from './components/avatar-preview/avatar-preview.component';
import { TweetTabsComponent } from './components/tweet-tabs/tweet-tabs.component';
import { ProfileRoutingModule } from './profile.routing.module';
import { StoreModule } from '@ngrx/store';
import { profileFeatureKey, profileReducer } from './store/reducers/profile.reducer';
import { TweetsTimelineComponent } from './components/tweets-timeline/tweets-timeline.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { TweetsModule } from '../tweets/tweets.module';
import { TweetsRepliesTimelineComponent } from './components/tweets-replies-timeline/tweets-replies-timeline.component';
import { SettingsComponent } from './components/settings/settings.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './components/home/home.component';
import { FriendshipModule } from '../friendship/friendship.module';
import { SharedModule } from '@app/shared';
import { FollowersComponent } from './components/followers/followers.component';
import { ProfileItemComponent } from './components/profile-item/profile-item.component';

@NgModule({
  declarations: [
		ProfileComponent,
		HomeComponent,
    BannerComponent,
		AvatarPreviewComponent,
		TweetTabsComponent,
		TweetsTimelineComponent,
		TweetsRepliesTimelineComponent,
		SettingsComponent,
		FollowersComponent,
		ProfileItemComponent
  ],
  imports: [
		CommonModule,
		StoreModule.forFeature(profileFeatureKey, profileReducer),
		TweetsModule,
		FriendshipModule,
		ProfileRoutingModule,
		InfiniteScrollModule,
		ReactiveFormsModule,
		SharedModule
  ]
})
export class ProfileModule { }
