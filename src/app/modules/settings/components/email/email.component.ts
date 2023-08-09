import { Component } from '@angular/core';
import { CustomizeViewService } from '@app/modules/customize-view/services/customize-view.service';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styles: [
  ]
})
export class EmailComponent {

	constructor(
		public customizeView: CustomizeViewService
	) { }

}
