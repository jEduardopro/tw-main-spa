import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LoginState, loginFeatureKey } from '../reducers/login.reducer';


export const loginFeatureState = createFeatureSelector<LoginState>(loginFeatureKey)

export const selectUserIdentifier = createSelector(
	loginFeatureState,
	(state) => state.user_identifier
);

export const selectUsername = createSelector(
	loginFeatureState,
	(state) => state.username
);