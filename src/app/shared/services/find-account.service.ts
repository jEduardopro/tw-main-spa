import { Injectable } from '@angular/core';
import { FindAccountResponse } from '../interfaces/find-account-response.interface';
import { Observable } from 'rxjs';
import { HttpRequestService } from '../../core/services/http-request.service';
import { Task } from '@app/core/types/task.type';

@Injectable({
  providedIn: 'root'
})
export class FindAccountService extends HttpRequestService {

	find(userIdentifier: string, taskId: Task): Observable<FindAccountResponse> {
		return this.post('/auth/account/find', { user_identifier: userIdentifier, task_id: taskId })
	}
}
