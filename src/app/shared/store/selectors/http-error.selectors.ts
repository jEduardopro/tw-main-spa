import { createSelector, createFeatureSelector } from '@ngrx/store';
import { httpErrorFeatureKey, HttpErrorState } from '../reducers/http-error.reducer';

export const httpErrorFeatureState = createFeatureSelector<HttpErrorState>(httpErrorFeatureKey)

export const selectFieldErrors = createSelector(
	httpErrorFeatureState,
	(state) => state.fieldErrors
);