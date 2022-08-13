import { createAction, props } from '@ngrx/store';

export const setFieldErrors = createAction(
	'[HTTP ERROR] Set Input Field Errors',
	props<{fieldErrors: any}>()
);