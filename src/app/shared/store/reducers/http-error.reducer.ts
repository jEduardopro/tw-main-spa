import { createReducer, on } from '@ngrx/store';
import { setFieldErrors } from '../actions/http-error.actions';

export const httpErrorFeatureKey = 'httpError'

export interface HttpErrorState {
	fieldErrors: any,
};

const initialState: HttpErrorState = {
	fieldErrors: null
};

export const httpErrorReducer = createReducer(
	initialState,
	on(
		setFieldErrors,
		(state, {fieldErrors}) => ({...state, fieldErrors}),
	),
);