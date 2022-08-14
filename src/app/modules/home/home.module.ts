import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimelineComponent } from './components/timeline/timeline.component';
import { HomeRoutingModule } from './home-routing.module';



@NgModule({
  declarations: [
    TimelineComponent
  ],
  imports: [
		CommonModule,
		HomeRoutingModule
	],
	exports: [
		HomeRoutingModule
	]
})
export class HomeModule { }
