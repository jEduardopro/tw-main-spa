import { Component, OnInit } from '@angular/core';
import { NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { environment } from '@env/environment';
import Echo from 'laravel-echo'
import { AuthService } from './modules/auth/services/auth.service';

declare global {
  interface Window { // ⚠️ notice that "Window" is capitalized here
    Echo: Echo;
  }
}

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
		"/": "Twitter. It’s what’s happening / X",
		"/i/flow/signup": "Sign up for Twitter / X",
		"/home": "Home / X",
		"/search": "Explore / X",
		"/settings/account": "Your Account / X",
		"/settings/your_twitter_data/account": "Account Information / X",
		"/settings/screen_name": "Change username / X",
		"/settings/country": "Change country / X",
		"/settings/password": "Change your password / X",
		"/settings/deactivate": "Deactivate account / X",
	}

	private apiURL = environment.apiUrl
	private pusherAppKey = environment.pusherKey
	
	constructor(
		private router: Router,
		private authService: AuthService,
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

		const token: string | null = this.authService.getToken();
		window.Echo = new Echo({
			broadcaster: 'pusher',
			key: this.pusherAppKey,
			cluster: 'us2',
			forceTLS: true,
			authEndpoint: `${this.apiURL}/broadcasting/auth`,
			auth: {
        headers: {
					Accept: 'application/json',
					'Authorization': `Bearer ${token}`,
				}
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
