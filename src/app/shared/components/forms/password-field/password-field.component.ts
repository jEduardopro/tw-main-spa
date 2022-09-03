import { Component, EventEmitter, Input, OnInit, Output, OnDestroy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-password-field',
  templateUrl: './password-field.component.html',
  styles: [
  ]
})
export class PasswordFieldComponent implements OnInit, OnDestroy{

	password = new FormControl('', [Validators.required, Validators.minLength(8)])

	@Input() value!: string;
	@Output() valueChange = new EventEmitter<string>();
	@Output() onEnter = new EventEmitter<void>();


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

	emitPressEnterKey() {
		this.onEnter.emit()
	}

}
