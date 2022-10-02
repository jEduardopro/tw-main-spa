import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '@app/modules/auth/services/auth.service';
import { environment } from '@env/environment';
import Echo from 'laravel-echo'
import { Observable, Subject } from 'rxjs';
import { HttpRequestService } from './http-request.service';

@Injectable({
  providedIn: 'root'
})
export class PusherEchoService {

	private apiURL = environment.apiUrl
	private pusherAppKey = environment.pusherKey
	private pusherEcho;
	private _events = new Subject<any>()
	public pusherEvents: Observable<any>
	private _notifications = new Subject<any>()
	public pusherNotifications: Observable<any>

	constructor(
		private authService: AuthService,
		private http: HttpClient
	) {
		const token: string | null = this.authService.getToken();
		this.pusherEcho = new Echo({
			broadcaster: 'pusher',
			key: this.pusherAppKey,
			cluster: 'us2',
			forceTLS: true,
			authEndpoint: `${this.apiURL}/broadcasting/auth`,
			auth: {
        headers: {
					Accept: 'application/json',
					'Authorization': `Bearer ${token}`,
				}
      }
		});
		this.pusherEvents = this._events.asObservable()
		this.pusherNotifications = this._notifications.asObservable()
	}

	listenEvent(channelName: string, eventName: string): void {
		this.pusherEcho.channel(channelName).listen(eventName, (data: any) => {
			this._events.next({data})
		})
	}

	listenPrivateNotification(privateChannelName: string): void {
		this.pusherEcho.private(privateChannelName).notification((notification:any) => {
			this._notifications.next(notification)
		})
	}

}
