import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { authFeatureKey, authReducer } from './store/reducers/auth.reducer';



@NgModule({
  declarations: [],
  imports: [
		CommonModule,
		StoreModule.forFeature(authFeatureKey, authReducer)
  ]
})
export class AuthModule { }
