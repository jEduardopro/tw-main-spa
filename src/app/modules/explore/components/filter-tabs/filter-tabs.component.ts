import { Component, OnInit } from '@angular/core';
import { CustomizeViewService } from '@app/modules/customize-view/services/customize-view.service';
import { Profile } from '@app/modules/profile/interfaces/profile.interface';
import { decrementFollowingCount, incrementFollowingCount } from '@app/modules/profile/store/actions/profile.actions';
import { SearcherService } from '@app/modules/searcher/services/searcher.service';
import { Tweet } from '@app/modules/tweets/interfaces/tweet.interface';
import { AppState } from '@app/store/app.reducers';
import { Store } from '@ngrx/store';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-filter-tabs',
  templateUrl: './filter-tabs.component.html',
  styles: [
  ]
})
export class FilterTabsComponent implements OnInit {

	currentTab = 'people'
	loading = false
	users: Profile[] = []
	tweets: Tweet[] = []
	loadingMoreUsers = false
	noMoreUsersToLoad = false
	loadingMoreTweets = false
	noMoreTweetsToLoad = false
	q = ''
	page = 1
	tweetsPage = 1

	constructor(
		public customizeView: CustomizeViewService,
		private searchService: SearcherService,
		private store: Store<AppState>
	) { }
	
	ngOnInit(): void {
		const url = new URL(window.location.href)
		const queryParams = new URLSearchParams(url.search)
		if (queryParams.has('q')) {
			this.search(queryParams.get('q')!)
		}
	}

	changeTab(tab: 'people'|'photos') {
		this.currentTab = tab
		if (this.q.trim() === '') return
		this.search(this.q)
	}

	async search(q: string) {	
		this.loading = true
		try {
			this.q = q
			if (this.currentTab === 'people') {
				const {data} = await firstValueFrom(this.searchService.searchPeople(q))
				this.users = data
			} else {
				const {data} = await firstValueFrom(this.searchService.searchPhotos(q))
				this.tweets = data
			}
			
		} catch (error) {
			console.log(error);
		}
		this.loading = false
	}

	async onScroll() {
		if (this.noMoreUsersToLoad) return

		this.loadingMoreUsers = true;
		try {
			const page = ++this.page;
			const { data } = await firstValueFrom(this.searchService.searchPeople(this.q, page))
			if (data.length == 0) {
				this.noMoreUsersToLoad = true;
				this.loadingMoreUsers = false;				
				return
			}
			this.users.push(...data)
			
		} catch (error) {
			console.log(error);
		}
		this.loadingMoreUsers = false;
	}

	async onPhotosScroll() {
		if (this.noMoreTweetsToLoad) return

		this.loadingMoreTweets = true;
		try {
			const page = ++this.tweetsPage;
			const { data } = await firstValueFrom(this.searchService.searchPhotos(this.q, page))
			if (data.length == 0) {
				this.noMoreTweetsToLoad = true;
				this.loadingMoreTweets = false;				
				return
			}
			this.tweets.push(...data)
			
		} catch (error) {
			console.log(error);
		}
		this.loadingMoreTweets = false;
	}

	setFollow(id: string, value: boolean) {
		const userFound = this.users.find(user => user.id === id)
		if (!userFound) {
			return
		}
		userFound.following = value
		if (value) {
			this.store.dispatch(incrementFollowingCount())
		} else {
			this.store.dispatch(decrementFollowingCount())
		}
	}

}
