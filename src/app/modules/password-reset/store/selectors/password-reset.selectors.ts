import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PasswordResetState, passwordResetFeatureKey } from '../reducers/password-reste.reducer';


export const passwordResetState = createFeatureSelector<PasswordResetState>(passwordResetFeatureKey)

export const selectAccountInfo = createSelector(
	passwordResetState,
	(state) => state.account_info
);

export const selectFlowToken = createSelector(
	passwordResetState,
	(state) => state.flow_token
);