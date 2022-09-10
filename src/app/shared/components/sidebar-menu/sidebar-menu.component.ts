import { Component, OnInit } from '@angular/core';
import { CustomizeViewService } from '../../../modules/customize-view/services/customize-view.service';

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
export class SidebarMenuComponent implements OnInit {

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
			link: '/settings',
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

	constructor(
		public customizeViewService: CustomizeViewService
	) { }

  ngOnInit(): void {
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