import { createReducer, on } from '@ngrx/store';
import { UserFormData } from '../../models/user-form.model';
import { setUserFormData, setRegisterResponse, toggleLoading } from '../actions/register.actions';
import { RegisterResponse } from '../../interfaces/register-response.interface';

export const registerFeatureKey = 'register';

export interface RegisterState {
	userFormData: UserFormData;
	registerResponse: RegisterResponse,
	loading: boolean

};

const initialState: RegisterState = {
	userFormData: {},
	registerResponse: {
		message: '',
		description: 'signup_with_email'
	},
	loading: false
};

export const registerReducer = createReducer(
	initialState,
	on(setUserFormData, (state, {userFormData}) => ({...state, userFormData}) ),
	on(setRegisterResponse, (state, {registerResponse}) => ({...state, registerResponse})  ),
	on(toggleLoading, (state, {status}) => ({...state, loading: status}) )
);