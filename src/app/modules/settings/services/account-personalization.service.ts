import { Injectable } from '@angular/core';
import { HttpRequestService } from '@app/core/services/http-request.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountPersonalizationService extends HttpRequestService {

	updateCountry(country: string): Observable<{message: string}> {
		return this.put('/account/personalization', { preference_type: 'country', value: country })
	}

	updateGender(gender: string): Observable<{ message: string }> {
		return this.put('/account/personalization', { preference_type: 'gender', value: gender })
	}

}
