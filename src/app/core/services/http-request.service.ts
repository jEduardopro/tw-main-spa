import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { environment } from "@env/environment";
import { Observable } from 'rxjs';


@Injectable({
	providedIn: 'root'
})
export class HttpRequestService {

	private apiUrl = environment.apiUrl
	private headers!: HttpHeaders

	constructor(
		private http: HttpClient
	) {
		this.setHeaders()
	}

	protected get(url: string, params = {}): Observable<any> {
		return this.http.get(`${this.apiUrl}${url}`, {params, headers: this.headers})
	}

	protected post(url: string, payload = {}): Observable<any> {
		return this.http.post(`${this.apiUrl}${url}`, payload, {headers: this.headers})
	}

	protected put(url: string, payload = {}): Observable<any> {
		return this.http.put(`${this.apiUrl}${url}`, payload, {headers: this.headers})
	}

	protected delete(url: string, payload = {}): Observable<any> {
		return this.http.delete(`${this.apiUrl}${url}`, {headers: this.headers, body: payload})
	}

	protected setHeaders(headers: HttpHeaders | null = null) {
		if (headers) {
			this.headers = headers
			return
		}
		this.headers = new HttpHeaders()
			.set('Content-Type', "application/json")
			.set('Accept', "application/json")
			.set("X-Requested-With", "XMLHttpRequest")
	}

}