import { Component, OnInit, OnDestroy } from '@angular/core';
import { selectAuthUsername } from '@app/modules/auth/store/selectors/auth.selectors';
import { Store } from '@ngrx/store';
import { CustomizeViewService } from '../../../modules/customize-view/services/customize-view.service';
import { AppState } from '../../../store/app.reducers';
import { Subscription } from 'rxjs';

export interface Menu {
	text: string,
	ariaLabel: string,
	icon: string,
	actionType: 'link' | 'popup',
	link: string | null,
	popup: 'customize-view' | null
}

@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
	styles: [
		`
			.itemMenuActive div div:nth-child(2){
				@apply font-bold
			}
		`
  ]
})
export class SidebarMenuComponent implements OnInit, OnDestroy{

	menu: Menu[] = [
		{
			text: 'Home',
			ariaLabel: 'Home (New Unread Tweets)',
			icon: 'fa fa-home',
			actionType: 'link',
			link: '/home',
			popup: null
		},
		{
			text: 'Explore',
			ariaLabel: 'Search and explore',
			icon: 'fa fa-search',
			actionType: 'link',
			link: '/search',
			popup: null
		},
		{
			text: 'Notifications',
			ariaLabel: 'Notifications',
			icon: 'far fa-bell',
			actionType: 'link',
			link: '/notifications',
			popup: null
		},
		{
			text: 'Profile',
			ariaLabel: 'Profile',
			icon: 'far fa-user',
			actionType: 'link',
			link: '#',
			popup: null
		},
		{
			text: 'Settings',
			ariaLabel: 'Settings',
			icon: 'fas fa-cog',
			actionType: 'link',
			link: '/settings/account',
			popup: null
		},
		{
			text: 'Display',
			ariaLabel: 'Display',
			icon: 'fas fa-palette',
			actionType: 'popup',
			link: null,
			popup: 'customize-view'
		},
	]

	showCustomizeViewModal = false

	storeSubscription: Subscription = new Subscription;

	constructor(
		public customizeViewService: CustomizeViewService,
		private store: Store<AppState>
	) { }

	ngOnInit(): void {
		const username$ = this.store.select(selectAuthUsername).subscribe(username => {
			this.menu[3].link = `/${username}`
		})
		this.storeSubscription.add(username$)
	}

	ngOnDestroy(): void {
		this.storeSubscription.unsubscribe()
	}
	
	onMouseEnter(event: MouseEvent) {
		this.toggleBgClass(event)
		// firstChild.classList.add('bg-twitter-gray-btn-hover')
	}
	
	onMouseLeave(event: MouseEvent) {
		this.toggleBgClass(event)
		// const element = event.target as HTMLElement
		// let firstChild = element.firstChild as HTMLElement
		// firstChild.classList.toggle('bg-twitter-black-btn-hover')
		// firstChild.classList.remove('bg-twitter-gray-btn-hover')
	}

	toggleBgClass(event: MouseEvent) {
		const element = event.target as HTMLElement
		let firstChild = element.firstChild as HTMLElement

		const displaySettings = this.customizeViewService.viewSettings
		
		const { themeBackground } = displaySettings
		if (themeBackground.name == 'lights out') {
			firstChild.classList.toggle('bg-twitter-black-btn-hover')
			return
		}
		firstChild.classList.toggle('bg-twitter-gray-btn-hover')

	}

	openCustomizeViewModal() {
		this.showCustomizeViewModal = true;
	}

}
