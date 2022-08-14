import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from '@app/shared/components/layout/layout.component';
import { TimelineComponent } from './components/timeline/timeline.component';

const routes: Routes = [
	{
		path: '',
		component: LayoutComponent,
		children: [
			{
				path: '',
				component: TimelineComponent
			}
		]
	},
	{
		path: '**',
		redirectTo: 'home'
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
export class HomeRoutingModule { }
