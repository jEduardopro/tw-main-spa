import { Component, Input, OnInit } from '@angular/core';
import { UserForm } from '@app/modules/register/models';

@Component({
	selector: 'app-step-one',
	templateUrl: './step-one.component.html',
	styles: [
	]
})
export class StepOneComponent implements OnInit {

	@Input() user!: UserForm;
	@Input() errors: any = {};

	public identifierType: ('email' | 'phone') = 'email';

	constructor() { }

	ngOnInit(): void {
	}

	toggleIdentifierField() {
		this.identifierType == 'email'
			? this.identifierType = 'phone'
			: this.identifierType = 'email'		
	}

}
