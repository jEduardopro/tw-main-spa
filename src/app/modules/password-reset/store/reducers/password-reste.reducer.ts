import { createReducer, on } from '@ngrx/store';
import { AccountInfoFound } from '@app/shared/interfaces/find-account-response.interface';
import { setUserAccountInfo, setFlowToken } from '../actions/password-reset.actions';

export const passwordResetFeatureKey = 'password-reset'

export interface PasswordResetState {
	account_info: AccountInfoFound,
	flow_token: string
};

const initialState: PasswordResetState = {
	account_info: {
		username: '',
		email: null,
		phone: null
	},
	flow_token: ''
};

export const passwordResetReducer = createReducer(
	initialState,
	on(setUserAccountInfo, (state, {account_info}) => ({...state, account_info})),
	on(setFlowToken, (state, {flow_token}) => ({...state, flow_token})),
);