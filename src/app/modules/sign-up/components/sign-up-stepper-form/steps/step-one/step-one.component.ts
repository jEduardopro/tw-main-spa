import { Component, Input, OnInit } from '@angular/core';
import { SignUp } from '../../../../../../core/models/sign-up.model';

@Component({
	selector: 'app-step-one',
	templateUrl: './step-one.component.html',
	styles: [
	]
})
export class StepOneComponent implements OnInit {

	@Input() user!: SignUp;

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
