import { AccentColor } from './../../interfaces/accent-color.interface';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AccentColorsList } from '../../utils/accent-colors';
import { BackgroundColor } from '../../interfaces/background-color.interface';
import { CustomizeViewService } from '../../services/customize-view.service';


@Component({
  selector: 'app-customize-view',
  templateUrl: './customize-view.component.html',
  styles: [
  ]
})
export class CustomizeViewComponent implements OnInit {

	@Output() closeModal = new EventEmitter();

	accentColors: AccentColor[] = AccentColorsList
	backgroundColors: BackgroundColor[] = [
		{
			background: 'bg-white',
			name: 'default'
		},
		{
			background: 'bg-black',
			name: 'lights out'
		}
	]

	constructor(
		public customizeViewService: CustomizeViewService
	) { }

  ngOnInit(): void {
	}

	
	close() {		
		this.closeModal.emit();
	}

	setAccentColor(accentColor: AccentColor) {
		this.customizeViewService.setThemeColor(accentColor)
	}

	setBgColor(bgColor: BackgroundColor) {
		this.customizeViewService.setThemeBackground(bgColor)
	}

}
