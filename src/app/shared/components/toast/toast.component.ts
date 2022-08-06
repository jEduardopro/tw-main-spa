import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit {

	@Output() disposeEvent = new EventEmitter()

	@Input() id!: string | number | undefined;
	@Input() type!: 'success' | 'info' | 'warning' | 'error';
	@Input() title!: string;
	@Input() message!: string | null;

  constructor() { }

  ngOnInit(): void {
	}
	
	hide() {
		this.disposeEvent.emit()
	}

}
