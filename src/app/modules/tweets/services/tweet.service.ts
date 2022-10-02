import { Injectable } from '@angular/core';
import { HttpRequestService } from '@app/core/services/http-request.service';
import { Observable } from 'rxjs';
import { TweetPayload } from '../interfaces/tweet-payload.interface';
import { Tweet } from '../interfaces/tweet.interface';

@Injectable({
  providedIn: 'root'
})
export class TweetService extends HttpRequestService {


	postTweet(tweet: TweetPayload): Observable<Tweet> {
		return this.post('/tweets', tweet)
	}

}
