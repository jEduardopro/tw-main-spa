import { createReducer, on } from '@ngrx/store';
// import * as class from '../actions/class';
import { UserFormData } from '../../models/user-form.model';
import { setUserFormData, setRegisterResponse } from '../actions/register.actions';
import { RegisterResponse } from '../../interfaces/register-response.interface';

export const registerFeatureKey = 'register';

export interface RegisterState {
	userFormData: UserFormData;
	fieldsErrors: any,
	registerResponse: RegisterResponse

};

const initialState: RegisterState = {
	userFormData: {},
	fieldsErrors: {},
	registerResponse: {
		message: '',
		description: 'signup_with_email'
	}
};

export const registerReducer = createReducer(
	initialState,
	on(
		setUserFormData,
		(state, {userFormData}) => ({...state, userFormData}),
	),
	on(
		setRegisterResponse,
		(state, {registerResponse}) => ({...state, registerResponse}) 
	),
);