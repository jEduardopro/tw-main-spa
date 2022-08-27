import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

	public openSignUpForm: boolean = false;
	public openLoginForm: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
