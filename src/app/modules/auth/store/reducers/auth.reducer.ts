import { createReducer, on } from '@ngrx/store';
import { AuthUser } from '../../interfaces/auth-user.interface';
import { setAuthUser } from '../actions/auth.actions';

export const authFeatureKey = 'auth';

export interface AuthState {
	authUser: AuthUser
};

const initialState: AuthState = {
	authUser: {
		id: '',
		name: '',
		username: '',
		email: '',
		is_activated: false,
		created_at: ''
	}
};

export const authReducer = createReducer(
	initialState,
	on(
		setAuthUser,
		(state, {authUser}) => ({...state, authUser}),
	),
);