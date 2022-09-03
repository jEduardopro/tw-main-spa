import { Injectable } from '@angular/core';
import { HttpRequestService } from '../../../core/services/http-request.service';
import { Observable } from 'rxjs';
import { SendPasswordResetPayload } from '../interfaces/send-password-reset-payload.interface';
import { PasswordResetPayload } from '../interfaces/password-reset-payload.interface';

@Injectable({
  providedIn: 'root'
})
export class PasswordResetService extends HttpRequestService {

	sendVerificationCode(payload: SendPasswordResetPayload): Observable<any> {
		return this.post('/auth/send-password-reset', payload)
	}

	verify(code: string): Observable<any> {
		return this.post('/auth/password-verify-code', {token: code})
	}

	reset(payload: PasswordResetPayload): Observable<any> {
		return this.post('/auth/reset-password', payload);
	}

}
