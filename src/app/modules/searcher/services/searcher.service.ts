import { Injectable } from '@angular/core';
import { HttpRequestService } from '@app/core/services/http-request.service';

@Injectable({
  providedIn: 'root'
})
export class SearcherService extends HttpRequestService {

	searchPeople(query: string) {
		return this.get('/search', {
			q: query
		})
	}

}
