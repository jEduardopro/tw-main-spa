import { Injectable } from '@angular/core';
import { HttpRequestService } from '@app/core/services/http-request.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountPasswordService extends HttpRequestService {

	updatePassword(data: {current_password: string, new_password: string, new_password_confirmation: string}): Observable<{message: string}> {
		return this.put('/account/password', data)
	}
  
}
