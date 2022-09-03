import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Toast, Position, Type } from '../interfaces/toast.interface';

interface ToastPayload {
	title: string,
	message?: string,
	timeout?: number,
	position?: Position
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
	toastEvents: Observable<Toast>
	private _events = new Subject<Toast>()

	constructor() {
		this.toastEvents = this._events.asObservable();
	}

	toast(
		{ type, title, message, timeout, position }:
		{
			type: Type,
			title: string, message?: string, timeout?: number,
			position?: Position
		}
	)
	{
		this._events.next({ type, title, message: message || null, timeout: timeout || 10000, position: position || 'center-bottom'});
	}

	toastSuccess({ title, message, timeout, position }: ToastPayload)
	{
		this.toast({ type: 'success', title, message, timeout, position })
	}
	
	toastInfo({ title, message, timeout, position }:ToastPayload)
	{
		this.toast({ type: 'info', title, message, timeout, position })
	}

	toastWarn({ title, message, timeout , position}: ToastPayload)
	{
		this.toast({ type: 'warning', title, message, timeout, position })
	}

	toastError({ title, message, position }: {title: string, message?: string, position?: Position})
	{		
		this.toast({type: 'error', title, message, position})
	}
}
