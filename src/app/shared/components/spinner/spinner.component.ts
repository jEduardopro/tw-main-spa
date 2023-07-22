import { Component } from '@angular/core';
import { CustomizeViewService } from '@app/modules/customize-view/services/customize-view.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styles: []
})
export class SpinnerComponent {

	constructor(
		public customizeView: CustomizeViewService,
	) { }

}
