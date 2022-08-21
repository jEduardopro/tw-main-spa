import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../modules/auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-menu',
  templateUrl: './account-menu.component.html',
  styles: [
  ]
})
export class AccountMenuComponent implements OnInit {

	logoutMenuIsOpen = false;

	constructor(
		private authService: AuthService,
		private router: Router
	) { }

  ngOnInit(): void {
	}
	
	toggleLogoutMenu() {
		this.logoutMenuIsOpen = !this.logoutMenuIsOpen
	}

	closeLogoutMenu() {
		this.logoutMenuIsOpen = false
	}

	logout() {
		this.authService.logout()
		this.router.navigateByUrl("/")
	}

}
