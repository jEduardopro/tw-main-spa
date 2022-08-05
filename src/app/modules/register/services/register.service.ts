import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { UserForm } from '../models';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

	private apiUrl = environment.apiUrl

	constructor(
		private http: HttpClient
	) { }


	register(user: UserForm) {
		
		return this.http.post(`${this.apiUrl}/auth/register`, user);
	}

}
