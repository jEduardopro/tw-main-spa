import { Injectable } from '@angular/core';
import { HttpRequestService } from '@app/core/services/http-request.service';
import { Observable } from 'rxjs';
import { HomeTimelineResponse } from '../interfaces/home-timeline-response.interface';

@Injectable({
  providedIn: 'root'
})
export class TimelineService extends HttpRequestService {

	getHomeTimeline(page: number): Observable<HomeTimelineResponse> {
		return this.get('/home/timeline', {page});
	}

}
