import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sticky-top-section',
  templateUrl: './sticky-top-section.component.html',
  styles: [
  ]
})
export class StickyTopSectionComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
	}
	
	goToTop() {
		const contentColumns = document.getElementById('contentColumns')
		if (!contentColumns) {
			return;
		}
		contentColumns.scrollIntoView({behavior: 'smooth', block: 'start'});
		
		
	}

}
