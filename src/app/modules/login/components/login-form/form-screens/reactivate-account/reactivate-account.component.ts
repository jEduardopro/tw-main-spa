import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-reactivate-account',
  templateUrl: './reactivate-account.component.html',
  styles: [
  ]
})
export class ReactivateAccountComponent {

	@Input() reactivationDeadline!: string
	@Output() reactivationFinished = new EventEmitter<void>()

	loading = false

	constructor() { }

	reactivate() {
		this.loading = true
		try {
			
		} catch (error) {
			
		}
		this.loading = false
	}

	cancel() {
		
	}

}
