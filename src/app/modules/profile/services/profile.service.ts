import { Injectable } from '@angular/core';
import { HttpRequestService } from '@app/core/services/http-request.service';
import { Observable } from 'rxjs';
import { Profile } from '../interfaces/profile.interface';
import { ProfileBasicPayload } from '../interfaces/profile-basic-payload.interface';
import { Response } from '@app/core/interfaces/response.interface';

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

	update(basicInfo: ProfileBasicPayload): Observable<Profile> {
		return this.put('/profile', basicInfo)
	}

	updateBanner(mediaId: string): Observable<{profile_banner_url: string}> {
		return this.post('/profile/update-banner', {media_id: mediaId})
	}

	updateImage(mediaId: string): Observable<{profile_image_url: string}> {
		return this.post('/profile/update-image', {media_id: mediaId})
	}

	followers(id: string, page: number): Observable<Response<Profile[]>> {
		return this.get(`/users/${id}/followers?page=${page}`)
	}

}
