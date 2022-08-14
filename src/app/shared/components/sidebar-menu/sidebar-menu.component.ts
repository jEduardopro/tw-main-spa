import { Component, OnInit } from '@angular/core';

export interface Menu {
	text: string,
	ariaLabel: string,
	icon: string,
	actionType: 'link' | 'popup',
	link: string | null,
	popup: string | null
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
			icon: 'fa fa-cog',
			actionType: 'link',
			link: '/settings',
			popup: null
		},
		{
			text: 'Display',
			ariaLabel: 'Display',
			icon: 'fa fa-paint-brush',
			actionType: 'popup',
			link: null,
			popup: 'customize-view'
		},
	]

  constructor() { }

  ngOnInit(): void {
	}
	
	onMouseEnter(event: MouseEvent) {
		const element = event.target as HTMLElement
		let firstChild = element.firstChild as HTMLElement
		firstChild.classList.add('bg-twitter-black-btn-hover')
		// firstChild.classList.add('bg-twitter-gray-btn-hover')
	}
	
	onMouseLeave(event: MouseEvent) {
		const element = event.target as HTMLElement
		let firstChild = element.firstChild as HTMLElement
		firstChild.classList.remove('bg-twitter-black-btn-hover')
		// firstChild.classList.remove('bg-twitter-gray-btn-hover')
	}

	openPopup() {
		console.log('here');
	}

}
