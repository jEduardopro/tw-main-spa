import { Component, OnInit } from '@angular/core';
import { CustomizeViewService } from '@app/modules/customize-view/services/customize-view.service';
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

	constructor(
		public customizeView: CustomizeViewService,
		private searchService: SearcherService
	) { }
	
	ngOnInit(): void { }

	async search(q: string) {		
		try {
			const response = await firstValueFrom(this.searchService.searchPeople(q))
			console.log({response});
			
		} catch (error) {
			
		}
	}

}
