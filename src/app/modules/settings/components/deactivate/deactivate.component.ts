import { Component } from '@angular/core';
import { NavigationService } from '@app/core/services/navigation.service';

@Component({
  selector: 'app-deactivate',
  templateUrl: './deactivate.component.html',
  styles: [
  ]
})
export class DeactivateComponent {

	constructor(
		private navigationService: NavigationService,
	) { }

	goToBack() {
		this.navigationService.back()
	}

}
