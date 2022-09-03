import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-phone-field',
  templateUrl: './phone-field.component.html',
  styles: [
  ]
})
export class PhoneFieldComponent implements OnInit, OnDestroy {

	phone = new FormControl('', [Validators.required, Validators.pattern("^([0-9]{3})?[-]?([0-9]{3})[-]?([0-9]{4})$")])
	@Input() value!: string;
	@Output() valueChange = new EventEmitter<string>();
	@Output() onEnter = new EventEmitter<void>();


	@Input() error: any;

  constructor() { }

	ngOnInit(): void {
		this.phone.setValue(this.value)

		this.phone.valueChanges.subscribe((v) => {
			if (!v) {
				this.valueChange.emit('')
				return;
			}
			this.valueChange.emit(v)

		})
	}

	ngOnDestroy(): void {
		this.phone.setValue('')
		this.valueChange.emit('')
	}
	
	restrictSpace(event: KeyboardEvent) {		
		if (event.keyCode == 32) {
			event.preventDefault();
			return false;
		}
		return true
	}

	emitPressEnterKey() {
		this.onEnter.emit()
	}

}
