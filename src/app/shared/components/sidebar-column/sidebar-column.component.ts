import { Component, OnInit } from '@angular/core';
import { CustomizeViewService } from '@app/modules/customize-view/services/customize-view.service';
import { Profile } from '@app/modules/profile/interfaces/profile.interface';
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
	listBox = false
	q: string = ''
	subjectTerms: Subject<string> = new Subject<string>()
	suggestions: Profile[] = []
	searching = false

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

	onFocus() {
		this.searchOnFocus = true
		this.listBox = true
	}
	
	onBlur() {
		this.searchOnFocus = false
		this.listBox = false
	}

	
	onSearch(event: Event) {
		const value = (event.target as HTMLInputElement).value
		this.subjectTerms.next(value)
	}

	clear() {
		this.q = ''
		this.suggestions = []
	}

	async getSuggestions() {
		this.searching = true
		try {
			const {data} = await firstValueFrom(this.searchService.searchPeople(this.q))
			this.suggestions = data
			
		} catch (error) {
			
		}
		this.searching = false
	}

	closeListbox() {
		this.listBox = false
	}

}
