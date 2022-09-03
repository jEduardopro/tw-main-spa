import { Component, EventEmitter, Input, OnInit, Output, ViewChild, ElementRef, OnDestroy, AfterViewInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-verification-code-field',
  templateUrl: './verification-code-field.component.html',
  styles: [
  ]
})
export class VerificationCodeFieldComponent implements OnInit, OnDestroy, AfterViewInit {

	code = new FormControl('', [Validators.required, Validators.maxLength(8)])
	@Input() value!: string;
	@Output() valueChange = new EventEmitter<string>();
	@Output() onEnter = new EventEmitter<void>();


	@Input() error: any;

	@ViewChild('inputCode') inputCode!: ElementRef;

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

	ngAfterViewInit(): void {
		this.inputCode.nativeElement.focus();
	}

	ngOnDestroy(): void {
		this.code.setValue('')
		this.valueChange.emit('')
	}

	emitPressEnterKey() {
		this.onEnter.emit()
	}
}
