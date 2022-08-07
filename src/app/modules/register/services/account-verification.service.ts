import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountVerificationService {

	private apiUrl = environment.apiUrl

	constructor(
		private http: HttpClient
	) { }
	
	
	verify(code: string) {
		return this.http.post(`${this.apiUrl}/auth/verification/verify`, {code});
	}

}
