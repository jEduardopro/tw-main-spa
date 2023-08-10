import { Injectable } from '@angular/core';
import { HttpRequestService } from '@app/core/services/http-request.service';

@Injectable({
  providedIn: 'root'
})
export class AccountDeactivationService extends HttpRequestService {

	deactivateAccount() {
		return this.post('/account/deactivation')
	}
  
}
