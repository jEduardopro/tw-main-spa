import { ActionReducerMap } from "@ngrx/store";
import * as httpError from '@app/shared/store/reducers/http-error.reducer';
import * as register from "@app/modules/register/store/reducers/register.reducer";
import * as auth from "@app/modules/auth/store/reducers/auth.reducer";

export interface AppState {
	httpError: httpError.HttpErrorState,
	register: register.RegisterState,
	auth: auth.AuthState
}

export const appReducers: ActionReducerMap<AppState> = {
	httpError: httpError.httpErrorReducer,
	register: register.registerReducer,
	auth: auth.authReducer
}