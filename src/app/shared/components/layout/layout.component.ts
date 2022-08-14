import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styles: [
  ]
})
export class LayoutComponent implements OnInit {

	bodyElement: HTMLElement | null = null;

  constructor() { }

	ngOnInit(): void {
		// this.bodyElement = document.body
		// this.bodyElement.style.backgroundColor = '#000000'
		// document.documentElement.classList.add('dark')
  }

}
