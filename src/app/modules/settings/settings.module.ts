import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { LayoutComponent } from './components/layout/layout.component';
import { SharedModule } from '@app/shared';


@NgModule({
	declarations: [
		LayoutComponent
	],
  imports: [
		CommonModule,
		SharedModule,
    SettingsRoutingModule
  ]
})
export class SettingsModule { }
