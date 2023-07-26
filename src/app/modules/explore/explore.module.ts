import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExploreRoutingModule } from './explore-routing.module';
import { FilterTabsComponent } from './components/filter-tabs/filter-tabs.component';
import { SharedModule } from '@app/shared';


@NgModule({
	declarations: [
		FilterTabsComponent
	],
  imports: [
		CommonModule,
		SharedModule,
		ExploreRoutingModule
	],
	exports: [
		ExploreRoutingModule
	]
})
export class ExploreModule { }
