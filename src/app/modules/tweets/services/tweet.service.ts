import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpRequestService } from '@app/core/services/http-request.service';
import { Observable } from 'rxjs';
import { TweetPayload } from '../interfaces/tweet-payload.interface';
import { Tweet } from '../interfaces/tweet.interface';

@Injectable({
  providedIn: 'root'
})
export class TweetService extends HttpRequestService {

	private httpHeaders: HttpHeaders = new HttpHeaders()
							.set('Content-Type', "application/json")
							.set('Accept', "application/json")
							.set("X-Requested-With", "XMLHttpRequest")

	postTweet(tweet: TweetPayload): Observable<Tweet> {
		return this.post('/tweets', tweet)
	}

	like(tweetId: string): Observable<any> {
		const headers = this.httpHeaders.set('X-Socket-ID', window.Echo.socketId())
		this.setHeaders(headers)

		return this.post(`/tweets/${tweetId}/likes`)
	}

	unlike(tweetId: string): Observable<any> {
		const headers = this.httpHeaders.set('X-Socket-ID', window.Echo.socketId())
		this.setHeaders(headers)

		return this.delete(`/tweets/${tweetId}/likes`)
	}

	retweet(tweetId: string): Observable<any> {
		const headers = this.httpHeaders.set('X-Socket-ID', window.Echo.socketId())
		this.setHeaders(headers)

		return this.post(`/retweets`, { tweet_id: tweetId })
	}

	undoRetweet(tweetId: string): Observable<any> {
		const headers = this.httpHeaders.set('X-Socket-ID', window.Echo.socketId())
		this.setHeaders(headers)

		return this.delete(`/retweets/${tweetId}`)
	}

}
