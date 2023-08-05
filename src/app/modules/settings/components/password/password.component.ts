import { Component } from '@angular/core';
import { NavigationService } from '@app/core/services/navigation.service';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styles: [
  ]
})
export class PasswordComponent {

	constructor(
		private navigationService: NavigationService,
	) { }

	goToBack() {
		this.navigationService.back()
	}
}
