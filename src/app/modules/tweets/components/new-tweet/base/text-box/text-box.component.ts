import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from '@app/modules/auth/interfaces/user.interface';
import { SearcherService } from '@app/modules/searcher/services/searcher.service';
import { MentionConfig } from 'angular-mentions';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-text-box',
  templateUrl: './text-box.component.html',
  styles: [
  ]
})
export class TextBoxComponent implements OnInit {

	@Input() body: string = '';
	@Output() userMentioned = new EventEmitter<any>()
	@Output() changeBody = new EventEmitter<Event>()

	people: User[] = [];
	mentionConfig: MentionConfig = {
		triggerChar: '@',
		labelKey: 'username',
		disableSearch: true,
	}

	constructor(
		private searcherService: SearcherService,
	) { }

  ngOnInit(): void {
	}
	
	async searchPeople(q: string) {
		let peopleResponse = await firstValueFrom(this.searcherService.searchPeople(q))
		console.log({peopleResponse});
		
		this.people = peopleResponse.data
	}

	updateTweet(event: Event) {
		this.changeBody.emit(event)
	}

	saveMention(user: any) {
		this.userMentioned.emit(user)
	}


}
