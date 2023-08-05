import { Injectable } from '@angular/core';
import { HttpRequestService } from '@app/core/services/http-request.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountInformationService extends HttpRequestService {

	updateUsername(username: string): Observable<{message: string}> {
		return this.put('/account/information/update-username', {username})
	}

}
