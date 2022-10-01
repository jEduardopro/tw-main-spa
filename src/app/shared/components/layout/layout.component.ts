import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../modules/auth/services/auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styles: [
  ]
})
export class LayoutComponent implements OnInit {

	bodyElement: HTMLElement | null = null;

	constructor(
		private authService: AuthService
	) { }

	ngOnInit(): void {
		this.authService.setUserAuthFromLS()
		// this.bodyElement = document.body
		// this.bodyElement.style.backgroundColor = '#000000'
		// document.documentElement.classList.add('dark')
	}
}
