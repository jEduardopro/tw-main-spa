import { Injectable } from '@angular/core';
import { HttpRequestService } from '@app/core/services/http-request.service';
import { Observable } from 'rxjs';
import { LoginResponse } from '../interfaces/login-response';
import { LoginForm } from '../models/login-form.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService extends HttpRequestService {


	login(loginData: LoginForm): Observable<LoginResponse> {
		return this.post('/auth/login', loginData);
	}

}
