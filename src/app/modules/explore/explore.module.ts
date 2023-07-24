import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExploreRoutingModule } from './explore-routing.module';
import { FilterTabsComponent } from './components/filter-tabs/filter-tabs.component';


@NgModule({
	declarations: [
		FilterTabsComponent
	],
  imports: [
		CommonModule,
		ExploreRoutingModule
	],
	exports: [
		ExploreRoutingModule
	]
})
export class ExploreModule { }
