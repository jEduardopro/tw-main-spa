import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimelineComponent } from './components/timeline/timeline.component';
import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { TweetsModule } from '../tweets/tweets.module';



@NgModule({
  declarations: [
    TimelineComponent
  ],
  imports: [
		CommonModule,
		SharedModule,
		TweetsModule,
		HomeRoutingModule
	],
	exports: [
		HomeRoutingModule
	]
})
export class HomeModule { }
