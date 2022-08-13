import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { SignUpPayload } from '../interfaces/sign-up-payload.interface';

@Injectable({
  providedIn: 'root'
})
export class SignUpService {

	private apiUrl = environment.apiUrl

	constructor(
		private http: HttpClient
	) { }


	signUp(payload: SignUpPayload) {

		return this.http.post(`${this.apiUrl}/auth/signup`, payload);
	}
}
