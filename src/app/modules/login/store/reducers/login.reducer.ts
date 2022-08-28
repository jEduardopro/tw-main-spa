import { createReducer, on } from '@ngrx/store';
import { setUsername, setUserIdentifier } from '../actions/login.actions';

export const loginFeatureKey = 'login'

export interface LoginState {
	user_identifier: string,
	username: string,
};

const initialState: LoginState = {
	user_identifier: '',
	username: '',
};

export const loginReducer = createReducer(
	initialState,
	on(setUserIdentifier, (state, {user_identifier}) => ({...state, user_identifier})),
	on(setUsername, (state, {username}) => ({...state, username})),
);