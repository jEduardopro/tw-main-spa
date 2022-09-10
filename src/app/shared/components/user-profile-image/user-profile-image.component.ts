import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-profile-image',
  templateUrl: './user-profile-image.component.html',
  styles: [
  ]
})
export class UserProfileImageComponent implements OnInit {

	@Input() image: string | null | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
