import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { RegisterResponse } from '../interfaces/register-response.interface';
import { UserFormData } from '../models/user-form.model';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

	private apiUrl = environment.apiUrl

	constructor(
		private http: HttpClient
	) { }


	register(user: UserFormData) {
		
		return this.http.post<RegisterResponse>(`${this.apiUrl}/auth/register`, user);
	}

}
