import { Component, Input, OnInit, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-name-field',
  templateUrl: './name-field.component.html',
  styles: [
  ]
})
export class NameFieldComponent implements OnInit, AfterViewInit {

	name = new FormControl('', [Validators.required])
	@Input() value!: string;
	@Output() valueChange = new EventEmitter<string>();
	@Output() onEnter = new EventEmitter<void>();

	@Input() error: any;

	@ViewChild('inputName') inputName!: ElementRef

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

	ngAfterViewInit(): void {
		this.inputName.nativeElement.focus()
	}

	emitPressEnterKey() {
		this.onEnter.emit()
	}
}
