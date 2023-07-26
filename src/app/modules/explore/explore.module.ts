import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExploreRoutingModule } from './explore-routing.module';
import { FilterTabsComponent } from './components/filter-tabs/filter-tabs.component';
import { SharedModule } from '@app/shared';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
	declarations: [
		FilterTabsComponent
	],
  imports: [
		CommonModule,
		SharedModule,
		InfiniteScrollModule,
		ExploreRoutingModule
	],
	exports: [
		ExploreRoutingModule
	]
})
export class ExploreModule { }
