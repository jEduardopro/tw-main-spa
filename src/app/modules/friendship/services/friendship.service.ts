import { Injectable } from '@angular/core';
import { HttpRequestService } from '@app/core/services/http-request.service';

@Injectable({
  providedIn: 'root'
})
export class FriendshipService extends HttpRequestService {

	follow(userId: string) {
		return this.post('/friendships/follow', {user_id: userId})
	}

	unfollow(userId: string) {
		return this.delete('/friendships/unfollow', {user_id: userId})
	}
}
