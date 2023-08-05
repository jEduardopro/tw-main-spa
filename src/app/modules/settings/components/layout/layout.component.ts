import { Component, OnInit } from '@angular/core';
import { AuthService } from '@app/modules/auth/services/auth.service';

@Component({
	selector: 'app-layout',
	templateUrl: './layout.component.html',
	styles: [
	]
})
export class LayoutComponent implements OnInit {


	constructor(
		private authService: AuthService
	) { }

	ngOnInit(): void {
		this.authService.setUserAuthFromLS()
	}

}
