import { Injectable } from '@angular/core';
import { HttpRequestService } from '@app/core/services/http-request.service';
import { Observable } from 'rxjs';
import { Profile } from '../interfaces/profile.interface';

@Injectable({
  providedIn: 'root'
})
export class ProfileService extends HttpRequestService {

  
	getProfile(username: string): Observable<Profile> {		
		return this.get(`/profile/${username}`);
	}

	getUserTweetsTimeline(id: string, page: number) {
		return this.get(`/users/${id}/timeline?page=${page}`)
	}
	
	getUserTweetsAndRepliesTimeline(id: string, page: number) {
		return this.get(`/users/${id}/tweets-replies-timeline?page=${page}`)
	}

	update() {

	}

	updateImage() {

	}

	updateBanner() {
		
	}

}
