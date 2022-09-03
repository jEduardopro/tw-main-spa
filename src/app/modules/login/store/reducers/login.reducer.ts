import { createReducer, on } from '@ngrx/store';
import { setUsername, setUserIdentifier, setFlowToken } from '../actions/login.actions';

export const loginFeatureKey = 'login'

export interface LoginState {
	user_identifier: string,
	username: string,
	flow_token: string
};

const initialState: LoginState = {
	user_identifier: '',
	username: '',
	flow_token: ''
};

export const loginReducer = createReducer(
	initialState,
	on(setUserIdentifier, (state, {user_identifier}) => ({...state, user_identifier})),
	on(setUsername, (state, {username}) => ({...state, username})),
	on(setFlowToken, (state, {flow_token}) => ({...state, flow_token})),
);