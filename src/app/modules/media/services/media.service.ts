import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpRequestService } from '@app/core/services/http-request.service';

@Injectable({
  providedIn: 'root'
})
export class MediaService extends HttpRequestService {
	
	upload(media: FormData) {
		this.setHeaders(new HttpHeaders())

		return this.post('/media/upload', media);
	}

	remove(id: string) {
		return this.delete(`/media/${id}/remove`);
	}

}
