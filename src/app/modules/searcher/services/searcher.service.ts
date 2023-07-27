import { Injectable } from '@angular/core';
import { Response } from '@app/core/interfaces/response.interface';
import { HttpRequestService } from '@app/core/services/http-request.service';
import { Profile } from '@app/modules/profile/interfaces/profile.interface';
import { Tweet } from '@app/modules/tweets/interfaces/tweet.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearcherService extends HttpRequestService {

	searchPeople(query: string, page: number = 1): Observable<Response<Profile[]>> {
		return this.get('/search', {
			q: query,
			page
		})
	}

	searchPhotos(query: string, page: number = 1): Observable<Response<Tweet[]>> {
		return this.get('/search', {
			q: query,
			f: 'image',
			page
		})
	}

}
