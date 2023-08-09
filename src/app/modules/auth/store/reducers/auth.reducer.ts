import { createReducer, on } from '@ngrx/store';
import { User } from '../../interfaces/user.interface';
import { setAuthUser } from '../actions/auth.actions';

export const authFeatureKey = 'auth';

export interface AuthState {
	authUser: User
};

const initialState: AuthState = {
	authUser: {
		id: '',
		name: '',
		username: '',
		description: '',
		email: null,
		phone: null,
		country: null,
		gender: null,
		date_birth: '',
		image: null,
		readable_joined_date: ''
	}
};

export const authReducer = createReducer(
	initialState,
	on(
		setAuthUser,
		(state, {authUser}) => ({...state, authUser}),
	),
);