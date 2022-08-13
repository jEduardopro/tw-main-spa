import { createFeatureSelector, createSelector } from "@ngrx/store";
import { RegisterState, registerFeatureKey } from '../reducers/register.reducer';

export const registerFeatureState = createFeatureSelector<RegisterState>(registerFeatureKey)

export const selectUserInfo = createSelector(
	registerFeatureState,
	(state) => state.userFormData
);

export const selectRegisterResponse = createSelector(
	registerFeatureState,
	(state) => state.registerResponse
);

export const selectDescriptionResponse = createSelector(
	registerFeatureState,
	(state) => state.registerResponse.description
);

export const selectLoading = createSelector(
	registerFeatureState,
	(state) => state.loading
);

