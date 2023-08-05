import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styles: [
  ]
})
export class AccountComponent {

	constructor(
		private router: Router
	) { }
	

	goTo(path: string){
		this.router.navigate([path])
	}

}
