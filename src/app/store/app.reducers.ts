import { ActionReducerMap, State } from "@ngrx/store";
import * as httpError from '@app/shared/store/reducers/http-error.reducer';
import * as register from "@app/modules/register/store/reducers/register.reducer";

export interface AppState {
	httpError: httpError.HttpErrorState,
	register: register.RegisterState
}

export const appReducers: ActionReducerMap<AppState> = {
	httpError: httpError.httpErrorReducer,
	register: register.registerReducer
}