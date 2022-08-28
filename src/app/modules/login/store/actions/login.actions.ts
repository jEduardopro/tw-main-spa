import { createAction, props } from "@ngrx/store";


export const setUserIdentifier = createAction(
	'[LOGIN] Set User Identifier',
	props<{user_identifier: string}>()
);

export const setUsername = createAction(
	'[LOGIN] Set Ussername',
	props<{username: string}>()
);