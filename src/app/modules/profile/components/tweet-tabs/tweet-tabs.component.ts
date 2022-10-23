import { Component, OnInit } from '@angular/core';
import { CustomizeViewService } from '@app/modules/customize-view/services/customize-view.service';

@Component({
  selector: 'app-tweet-tabs',
  templateUrl: './tweet-tabs.component.html',
  styles: [
  ]
})
export class TweetTabsComponent implements OnInit {

	currentTab: 'tweets'|'tweets_replies' = 'tweets'

	constructor(
		public customizeView: CustomizeViewService
	) { }

  ngOnInit(): void {
	}
	
	setTab(tab: 'tweets' | 'tweets_replies') {
		this.currentTab = tab
	}

}
