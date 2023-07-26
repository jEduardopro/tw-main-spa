import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-sidebar-column',
  templateUrl: './sidebar-column.component.html',
  styles: [
  ]
})
export class SidebarColumnComponent implements OnInit {

	currentRoute = ''

	ngOnInit(): void {
		this.currentRoute = window.location.pathname;
	}

	get showSearchBox() { return this.currentRoute !== '/search' }
}
