import { createAction, props } from '@ngrx/store';
import { AccountInfoFound } from '@app/shared/interfaces/find-account-response.interface';

export const setUserAccountInfo = createAction(
	'[PASSWORD RESET] Set User Account Info Found',
	props<{ account_info: AccountInfoFound}>()
);

export const setFlowToken = createAction(
	'[PASSWORD RESET] Set Flow Token',
	props<{ flow_token: string }>()
);