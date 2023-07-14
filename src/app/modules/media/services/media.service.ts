import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpRequestService } from '@app/core/services/http-request.service';
import { Observable } from 'rxjs';
import { MediaResponse } from '../interfaces/media-response.interface';

@Injectable({
  providedIn: 'root'
})
export class MediaService extends HttpRequestService {
	
	upload(media: FormData): Observable<MediaResponse> {
		this.setHeaders(new HttpHeaders())

		return this.post('/media/upload', media);
	}

	remove(id: string) {
		return this.delete(`/media/${id}/remove`);
	}

}
