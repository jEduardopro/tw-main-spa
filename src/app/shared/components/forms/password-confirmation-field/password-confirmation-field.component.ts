import { Component, EventEmitter, Input, OnInit, Output, OnDestroy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-password-confirmation-field',
  templateUrl: './password-confirmation-field.component.html',
  styles: [
  ]
})
export class PasswordConfirmationFieldComponent implements OnInit, OnDestroy {

	password_confirmation = new FormControl('', [Validators.required, Validators.minLength(8)])

	@Input() value!: string;
	@Output() valueChange = new EventEmitter<string>();
	@Output() onEnter = new EventEmitter<void>();


	@Input() error: any;

  constructor() { }

	ngOnInit(): void {
		this.password_confirmation.setValue(this.value)

		this.password_confirmation.valueChanges.subscribe((v) => {
			if (!v) {
				this.valueChange.emit('')
				return;
			}
			this.valueChange.emit(v)
		})
	}
	
	ngOnDestroy(): void {
		this.password_confirmation.setValue('')
		this.valueChange.emit('')
	}

	emitPressEnterKey() {
		this.onEnter.emit()
	}

}
