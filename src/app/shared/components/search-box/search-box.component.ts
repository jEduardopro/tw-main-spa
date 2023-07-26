import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CustomizeViewService } from '@app/modules/customize-view/services/customize-view.service';
import { Profile } from '@app/modules/profile/interfaces/profile.interface';
import { SearcherService } from '@app/modules/searcher/services/searcher.service';
import { Subject, debounceTime, firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styles: [
  ]
})
export class SearchBoxComponent implements OnInit {
	
	searchOnFocus = false
	listBox = false
	q: string = ''
	subjectTerms: Subject<string> = new Subject<string>()
	suggestions: Profile[] = []
	searching = false
	currentRoute = ''

	@Output() submit = new EventEmitter<string>()

	constructor(
		public customizeView: CustomizeViewService,
		private searchService: SearcherService,
		private router: Router
	) { }

	ngOnInit(): void {
		this.currentRoute = window.location.pathname		

		this.subjectTerms
			.pipe((debounceTime(500)))
			.subscribe((value) => {
				this.getSuggestions()
		})
	}

	onFocus() {
		this.searchOnFocus = true
		this.listBox = true
	}
	
	onBlur() {
		this.searchOnFocus = false
	}

	onSearch(event: Event) {
		const value = (event.target as HTMLInputElement).value
		this.subjectTerms.next(value)
	}

	onSubmit(event: Event) {
		event.preventDefault()
		this.router.navigate(['/search'], {queryParams: {q: this.q}})
		this.closeListbox()
		if (this.currentRoute === '/search') {
			const input = document.getElementById('search_box') as HTMLInputElement
			input.blur()
			this.submit.emit(this.q)
			return
		}
		this.clear()
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

	goToProfile(username: string) {
		this.clear()
		this.closeListbox()
		this.router.navigate(['/', username])
	}
}
