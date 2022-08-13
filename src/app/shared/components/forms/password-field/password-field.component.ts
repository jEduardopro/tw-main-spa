import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-password-field',
  templateUrl: './password-field.component.html',
  styles: [
  ]
})
export class PasswordFieldComponent implements OnInit {

	password = new FormControl('', [Validators.required, Validators.minLength(8)])

	@Input() value!: string;
	@Output() valueChange = new EventEmitter<string>();

	@Input() error: any;

	constructor() { }

	ngOnInit(): void {
		this.password.setValue(this.value)

		this.password.valueChanges.subscribe((v) => {
			if (!v) {
				this.valueChange.emit('')
				return;
			}
			this.valueChange.emit(v)
		})
	}

	ngOnDestroy(): void {
		this.password.setValue('')
		this.valueChange.emit('')
	}

}
