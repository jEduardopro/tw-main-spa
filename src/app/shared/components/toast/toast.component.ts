import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '@app/modules/auth/services/auth.service';
import { CustomizeViewService } from '@app/modules/customize-view/services/customize-view.service';

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

	constructor(
		public customizeService: CustomizeViewService,
		public authService: AuthService
	) { }

  ngOnInit(): void {
	}
	
	hide() {
		this.disposeEvent.emit()
	}

}
