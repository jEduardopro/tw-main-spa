import { Component } from '@angular/core';
import { NavigationService } from '@app/core/services/navigation.service';

@Component({
  selector: 'app-account-information',
  templateUrl: './account-information.component.html',
  styles: [
  ]
})
export class AccountInformationComponent {

	constructor(
		private navigationService: NavigationService,
	) { }

	goToBack() {
		this.navigationService.back()
	}

}
