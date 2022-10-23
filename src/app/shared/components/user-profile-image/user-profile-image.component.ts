import { Component, Input, OnInit } from '@angular/core';
import { Image } from '@app/modules/auth/interfaces/user.interface';

@Component({
  selector: 'app-user-profile-image',
  templateUrl: './user-profile-image.component.html',
  styles: [
  ]
})
export class UserProfileImageComponent implements OnInit {

	@Input() image: Image | null | undefined;
	@Input() size: 'small'|'large'|'thumb'|'medium' = 'small'

  constructor() { }

  ngOnInit(): void {
  }

}
