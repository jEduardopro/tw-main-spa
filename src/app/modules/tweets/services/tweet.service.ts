import { Injectable } from '@angular/core';
import { HttpRequestService } from '@app/core/services/http-request.service';
import { TweetPayload } from '../interfaces/tweet-payload.interface';

@Injectable({
  providedIn: 'root'
})
export class TweetService extends HttpRequestService {


	postTweet(tweet: TweetPayload) {
		return this.post('/tweets', tweet)
	}

}
