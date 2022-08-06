import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Toast, Position } from '../../interfaces/toast.interface';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-toaster',
  templateUrl: './toaster.component.html',
  styleUrls: ['./toaster.component.scss']
})
export class ToasterComponent implements OnInit {
	currentToasts: Toast[] = [];
	toasterPosition: Position = 'center-bottom'

	constructor(
		private toastService: ToastService,
	) { }

	ngOnInit(): void {
		this.subscribeToToastEvents();
	}
	
	subscribeToToastEvents() {
		this.toastService.toastEvents.subscribe((toast) => {
			this.toasterPosition = toast.position;
			const currentToast: Toast = { ...toast, id: +new Date() }
			this.currentToasts.push(currentToast);
			setTimeout(() => {
				if (currentToast.type == 'error') {
					return;
				}
				const toastIndex = this.currentToasts.findIndex(cr => cr.id == currentToast.id)
				if (toastIndex != -1) {
					this.remove(toastIndex);
				}
			}, currentToast.timeout);
		})
	}

	remove(idx: number) {
		this.currentToasts.splice(idx, 1);
	}

}
