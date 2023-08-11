import { createAction, props } from "@ngrx/store";


export const setUserIdentifier = createAction(
	'[LOGIN] Set User Identifier',
	props<{user_identifier: string}>()
);

export const setUserPassword = createAction(
	'[LOGIN] Set User Password',
	props<{password: string}>()
);

export const setUsername = createAction(
	'[LOGIN] Set Username',
	props<{username: string}>()
);

export const setFlowToken = createAction(
	'[LOGIN] Set Flow Token',
	props<{flow_token: string}>()
);