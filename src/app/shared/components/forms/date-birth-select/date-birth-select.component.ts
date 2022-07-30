import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

const getMonth = (idx: number) => {
	let objDate = new Date();
	objDate.setDate(1);
	objDate.setMonth(idx - 1);

	let locale = "en-us",
		month = objDate.toLocaleString(locale, { month: "long" });

	return month;
}

@Component({
  selector: 'app-date-birth-select',
  templateUrl: './date-birth-select.component.html',
  styles: [
  ]
})
export class DateBirthSelectComponent implements OnInit {

	form: FormGroup = new FormGroup({
		month: new FormControl('', [Validators.required]),
		day: new FormControl('', [Validators.required]),
		year: new FormControl('', [Validators.required])
	});


	@Input() value!: string;
	@Output() valueChange = new EventEmitter<string>();

	months = Array(12).fill(0).map((i, idx) => getMonth(idx + 1));
	years: Array<number | string> = [];

	public get days() {
		const year = this.form.get('year')?.value;
		const month = this.form.get('month')?.value;
		const dayCount = this.getDaysInMonth(year, month);
		return Array(dayCount).fill(0).map((i, idx) => idx + 1)
	}

	constructor() {
		this.setYears();
	}

	ngOnInit(): void {
		this.setSelectValues();

		this.form.valueChanges.subscribe((v) => {
			if (!this.form.valid) {
				return
			}
			const date = this.getDateFormatted();
						
			this.valueChange.emit(date)
		})
	}

	getDateFormatted(): string {
		let year = this.form.get('year')?.value
		let month = this.form.get('month')?.value
		let day = this.form.get('day')?.value
		if (month < 10) {
			month = `0${month}`
		}
		if (day < 10) {
			day = `0${day}`
		}
		return `${year}-${month}-${day}`
	}

	getDaysInMonth(year: number, month: number) {
		return 32 - new Date(year, month - 1, 32).getDate();
	}

	setYears() {
		const currentYear = new Date().getFullYear()
		for (let index = 1900; index <= currentYear; index++) {
			this.years.unshift(index);
		}
	}

	setSelectValues() {
		if (!this.value) {
			return;
		}
		const dateParts = this.value.split('-');
		let month = dateParts[1];
		let day = dateParts[2];
		if (parseFloat(dateParts[1]) < 10) {
			month = `0${month}`
		}
		if (parseFloat(dateParts[2]) < 10) {
			day = `0${day}`
		}
		this.form.setValue({
			month: month,
			day: day,
			year: dateParts[0]
		})
	}

}
