import { Injectable } from '@angular/core';
import { HttpRequestService } from '../../../core/services/http-request.service';
import { Observable } from 'rxjs';
import { User } from '@app/modules/auth/interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class ReactivateAccountService extends HttpRequestService {

	reactivateAccount(data: { user_identifier: string, password: string }): Observable<{token:string, user: User}>{
		return this.post('/account/reactivation', data);
	}

}
