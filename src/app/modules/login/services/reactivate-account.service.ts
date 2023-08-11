import { Injectable } from '@angular/core';
import { HttpRequestService } from '../../../core/services/http-request.service';

@Injectable({
  providedIn: 'root'
})
export class ReactivateAccountService extends HttpRequestService {

  reactivateAccount(data: {user_identifier:string, password: string}) {
		return this.post('/account/reactivation', data);
	}

}
