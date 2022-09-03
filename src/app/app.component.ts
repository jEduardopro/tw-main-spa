import { Component, OnInit } from '@angular/core';
import { NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';

interface DocTitle {
	[key: string]: string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
	title = 'Twitter';

	titles: DocTitle = {
		"/": "Twitter. It’s what’s happening / Twitter",
		"/i/flow/signup": "Sign up for Twitter / Twitter",
		"/home": "Home / Twitter",
	}
	
	constructor(
		private router: Router
	) {

	}

	ngOnInit(): void {
		this.router.events.subscribe((event) => {


			if (event instanceof NavigationStart) {
				// Show loading indicator
				// console.log('NavigationStart');
				
			}

			if (event instanceof NavigationEnd) {
				// Hide loading indicator
				const urlPath = this.router.url
				this.setTitleDocument(urlPath)
			}

			if (event instanceof NavigationError) {
				// Hide loading indicator

				// Present error to user
				console.log(event.error);
			}

		})
	}

	setTitleDocument(urlPathKey: string) {
		const title = this.titles[urlPathKey]
		if (!title) {
			document.title = this.title
			return;
		}
		document.title = title
	}

}
