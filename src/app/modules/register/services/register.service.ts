import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { UserForm } from '../models';
import { RegisterResponse } from '../interfaces/register-response.interface';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

	private apiUrl = environment.apiUrl

	constructor(
		private http: HttpClient
	) { }


	register(user: UserForm) {
		
		return this.http.post<RegisterResponse>(`${this.apiUrl}/auth/register`, user);
	}

}
