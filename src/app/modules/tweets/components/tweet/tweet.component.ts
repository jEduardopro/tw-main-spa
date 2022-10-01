import { Component, Input, OnInit } from '@angular/core';
import { Tweet } from '../../interfaces/tweet.interface';

@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styles: [
  ]
})
export class TweetComponent implements OnInit {

	@Input() tweet!: Tweet

  constructor() { }

  ngOnInit(): void {
  }

}
