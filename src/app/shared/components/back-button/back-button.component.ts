import { Component } from '@angular/core';
import { NavigationService } from '@app/core/services/navigation.service';

@Component({
  selector: 'app-back-button',
  templateUrl: './back-button.component.html',
  styles: [
  ]
})
export class BackButtonComponent {

	constructor(
		private navigationService: NavigationService,
	) { }

	goToBack() {
		this.navigationService.back()
	}

}
