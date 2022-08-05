import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-name-field',
  templateUrl: './name-field.component.html',
  styles: [
  ]
})
export class NameFieldComponent implements OnInit {

	name = new FormControl('', [Validators.required])
	@Input() value!: string;
	@Output() valueChange = new EventEmitter<string>();

	@Input() error: any;

  constructor() { }

	ngOnInit(): void {
		this.name.setValue(this.value)

		this.name.valueChanges.subscribe((v) => {
			if (!v) {
				this.valueChange.emit('')				
				return;
			}
			this.valueChange.emit(v)				

		})

	}
}
