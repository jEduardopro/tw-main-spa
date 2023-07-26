import { Component, OnInit } from '@angular/core';
import { CustomizeViewService } from '@app/modules/customize-view/services/customize-view.service';
import { Profile } from '@app/modules/profile/interfaces/profile.interface';
import { SearcherService } from '@app/modules/searcher/services/searcher.service';
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
	loadingMoreUsers = false
	noMoreUsersToLoad = false
	q = ''
	page = 1

	constructor(
		public customizeView: CustomizeViewService,
		private searchService: SearcherService
	) { }
	
	ngOnInit(): void { }

	async search(q: string) {		
		this.loading = true
		try {
			this.q = q
			const {data} = await firstValueFrom(this.searchService.searchPeople(q))
			console.log(data);
			this.users = data
			
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

	setFollow(id: string, value: boolean) {
		
	}

}
