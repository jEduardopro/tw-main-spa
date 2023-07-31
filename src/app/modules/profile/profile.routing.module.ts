import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from '../../shared/components/layout/layout.component';
import { ProfileComponent } from './components/profile/profile.component';
import { CommonModule } from '@angular/common';
import { HomeComponent } from "./components/home/home.component";
import { FollowingComponent } from "./components/following/following.component";
import { FollowersComponent } from "./components/followers/followers.component";
import { StatusComponent } from "./components/status/status.component";

const routes: Routes = [
	{
		path: '',
		component: LayoutComponent,
		children: [
			{
				path: '',
				component: ProfileComponent,
				children: [
					{
						path: '',
						component: HomeComponent
					},
					{
						path: 'following',
						component: FollowingComponent
					},
					{
						path: 'followers',
						component: FollowersComponent
					},
					{
						path: 'status/:tweet',
						component: StatusComponent
					}
				]
			},
		]
	}
]


@NgModule({
	imports: [
		CommonModule,
		RouterModule.forChild(routes)
	],
	exports: [RouterModule]
})

export class ProfileRoutingModule {}