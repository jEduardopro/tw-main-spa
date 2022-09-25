import { createFeatureSelector, createSelector } from '@ngrx/store';
import { authFeatureKey, AuthState } from '../reducers/auth.reducer';

export const authFeatureState = createFeatureSelector<AuthState>(authFeatureKey)

export const selectAuthUser = createSelector(
	authFeatureState,
	(state) => state.authUser
);
export const selectAuthUserImage = createSelector(
	authFeatureState,
	(state) => state.authUser.image
);
export const selectAuthUserBio = createSelector(
	authFeatureState,
	(state) => state.authUser.description
);
export const selectAuthName = createSelector(
	authFeatureState,
	(state) => state.authUser.name
);
export const selectAuthUsername = createSelector(
	authFeatureState,
	(state) => state.authUser.username
);