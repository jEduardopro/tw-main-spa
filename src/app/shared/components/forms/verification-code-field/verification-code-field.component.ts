import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-verification-code-field',
  templateUrl: './verification-code-field.component.html',
  styles: [
  ]
})
export class VerificationCodeFieldComponent implements OnInit {

	code = new FormControl('', [Validators.required, Validators.maxLength(8)])
	@Input() value!: string;
	@Output() valueChange = new EventEmitter<string>();

	@Input() error: any;

	constructor() { }

	ngOnInit(): void {
		this.code.setValue(this.value)

		this.code.valueChanges.subscribe((v) => {
			if (!v) {
				this.valueChange.emit('')
				return;
			}
			this.valueChange.emit(v)

		})
	}

	ngOnDestroy(): void {
		this.code.setValue('')
		this.valueChange.emit('')
	}
}
