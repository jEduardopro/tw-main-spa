import { Component, Input, OnInit } from '@angular/core';
import { Tweet } from '@app/modules/tweets/interfaces/tweet.interface';

@Component({
  selector: 'app-replies',
  templateUrl: './replies.component.html',
  styles: [
  ]
})
export class RepliesComponent implements OnInit {

	@Input() tweet!: Tweet

  constructor() { }

  ngOnInit(): void {
  }

}
