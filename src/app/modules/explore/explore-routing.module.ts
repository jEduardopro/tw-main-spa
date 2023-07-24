import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FilterTabsComponent } from "./components/filter-tabs/filter-tabs.component";
import { LayoutComponent } from "@app/shared/components/layout/layout.component";

const routes: Routes = [
	{
		path: '',
		component: LayoutComponent,
		children: [
			{
				path: '',
				component: FilterTabsComponent,
			}
		]
	}
]

@NgModule({
	declarations: [],
	imports: [
		CommonModule,
		RouterModule.forChild(routes)
	],
	exports: [
		RouterModule
	]
})

export class ExploreRoutingModule {}