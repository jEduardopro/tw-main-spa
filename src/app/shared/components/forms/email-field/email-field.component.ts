import { Component, OnInit, EventEmitter, Output, Input, OnDestroy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-email-field',
  templateUrl: './email-field.component.html',
  styles: [
  ]
})
export class EmailFieldComponent implements OnInit, OnDestroy {

	email = new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]{2,8}\.[a-z]{2,4}$")])

	@Input() value!: string;
	@Output() valueChange = new EventEmitter<string>();
	@Output() onEnter = new EventEmitter<void>();


	@Input() error: any;

  constructor() { }

	ngOnInit(): void {
		this.email.setValue(this.value)

		this.email.valueChanges.subscribe((v) => {
			if (!v) {
				this.valueChange.emit('')
				return;
			}
			this.valueChange.emit(v)
		})
	}
	
	ngOnDestroy(): void {
		this.email.setValue('')
		this.valueChange.emit('')
	}

	emitPressEnterKey() {
		this.onEnter.emit()
	}

}
