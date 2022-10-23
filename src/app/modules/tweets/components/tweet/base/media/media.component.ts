import { Component, Input, OnInit } from '@angular/core';
import { Image } from '@app/modules/auth/interfaces/user.interface';

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styles: [
  ]
})
export class MediaComponent implements OnInit {

	@Input() media: Image[] = []

  constructor() { }

  ngOnInit(): void {
  }

}
