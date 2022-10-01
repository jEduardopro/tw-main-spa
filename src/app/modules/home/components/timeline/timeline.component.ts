import { Component, OnInit } from '@angular/core';
import { Tweet } from '@app/modules/tweets/interfaces/tweet.interface';
import { firstValueFrom } from 'rxjs';
import { TimelineService } from '../../services/timeline.service';
import { CustomizeViewService } from '../../../customize-view/services/customize-view.service';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
	styles: [
		`
			:host {
				display:flex;
				flex-direction: column;
				flex-grow:1;
				position:relative;
			}
		`
	],
})
export class TimelineComponent implements OnInit {

	tweets: Tweet[] = [];
	page = 1;
	waitingResponse = false
	loadingMoreTweets = false

	constructor(
		private timelineService: TimelineService,
		public customizeView: CustomizeViewService
	) { }

	ngOnInit(): void {
		this.loadHomeTimeline()
	}

	async loadHomeTimeline() {
		this.waitingResponse = true;
		try {
			const response = await firstValueFrom(this.timelineService.getHomeTimeline(this.page))
			this.tweets = response.data
			
		} catch (error) {
			
		}
		this.waitingResponse = false;
	}

	async onScroll() {
		console.log("scrolled!! timeline home");
		this.loadingMoreTweets = true;
		try {
			const {data} = await firstValueFrom(this.timelineService.getHomeTimeline(++this.page))
			this.tweets.push(...data)
			
		} catch (error) {
			
		}
		this.loadingMoreTweets = false;
  }

}
