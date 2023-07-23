import { Component, OnInit } from '@angular/core';
import { CustomizeViewService } from '@app/modules/customize-view/services/customize-view.service';
import { SearcherService } from '@app/modules/searcher/services/searcher.service';
import { Subject, debounceTime, firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-sidebar-column',
  templateUrl: './sidebar-column.component.html',
  styles: [
  ]
})
export class SidebarColumnComponent implements OnInit {

	searchOnFocus = false
	q: string = ''
	subjectTerms: Subject<string> = new Subject<string>()

	constructor(
		public customizeView: CustomizeViewService,
		private searchService: SearcherService
	) { }

	ngOnInit(): void {
		this.subjectTerms
			.pipe((debounceTime(500)))
			.subscribe((value) => {
				console.log(value);
				this.getSuggestions()
		})
	}
	
	onSearch(event: Event) {
		const value = (event.target as HTMLInputElement).value
		this.subjectTerms.next(value)
	}

	async getSuggestions() {
		try {
			const {data} = await firstValueFrom(this.searchService.searchPeople(this.q))
			console.log({data});
			
		} catch (error) {
			
		}
	}

}
