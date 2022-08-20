import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomizeViewComponent } from './components/customize-view/customize-view.component';



@NgModule({
  declarations: [
    CustomizeViewComponent
  ],
  imports: [
    CommonModule
	],
	exports: [
		CustomizeViewComponent
	]
})
export class CustomizeViewModule { }
