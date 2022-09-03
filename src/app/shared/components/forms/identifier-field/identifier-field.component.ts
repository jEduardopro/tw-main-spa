import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-identifier-field',
  templateUrl: './identifier-field.component.html',
  styles: [
  ]
})
export class IdentifierFieldComponent implements OnInit {

	identifier = new FormControl('', [Validators.required])
	@Input() value!: string;
	@Output() valueChange = new EventEmitter<string>();
	@Output() onEnter = new EventEmitter<void>();

  constructor() { }

	ngOnInit(): void {
		
		this.identifier.setValue(this.value)

		this.identifier.valueChanges.subscribe((v) => {
			if (!v) {
				this.valueChange.emit('')
				return;
			}
			this.valueChange.emit(v)

		})

	}

	emitPressEnterKey() {
		this.onEnter.emit()
	}

}
