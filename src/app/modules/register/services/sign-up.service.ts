import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { SignUpPayload, SignUpResponse} from '../interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignUpService {

	private apiUrl = environment.apiUrl

	constructor(
		private http: HttpClient
	) { }


	signUp(payload: SignUpPayload): Observable<SignUpResponse> {
		return this.http.post<SignUpResponse>(`${this.apiUrl}/auth/signup`, payload);
	}
}
