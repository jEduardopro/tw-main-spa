import { Component, Input } from '@angular/core';
import { CustomizeViewService } from '@app/modules/customize-view/services/customize-view.service';
import { Tweet } from '@app/modules/tweets/interfaces/tweet.interface';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styles: [
  ]
})
export class BodyComponent {

	@Input() tweet!: Tweet;
	@Input() dontShowReply = false;
	@Input() dontShowMedia = false;

	constructor(
		public customizeView: CustomizeViewService,
	) {}

}
