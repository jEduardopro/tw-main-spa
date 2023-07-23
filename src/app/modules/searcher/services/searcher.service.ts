import { Injectable } from '@angular/core';
import { Response } from '@app/core/interfaces/response.interface';
import { HttpRequestService } from '@app/core/services/http-request.service';
import { Profile } from '@app/modules/profile/interfaces/profile.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearcherService extends HttpRequestService {

	searchPeople(query: string): Observable<Response<Profile[]>> {
		return this.get('/search', {
			q: query
		})
	}

}
