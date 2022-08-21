import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { authFeatureKey, authReducer } from './store/reducers/auth.reducer';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [],
  imports: [
		CommonModule,
		StoreModule.forFeature(authFeatureKey, authReducer),
		HttpClientModule
  ]
})
export class AuthModule { }
