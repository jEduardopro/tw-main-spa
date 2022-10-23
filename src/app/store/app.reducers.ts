import { ActionReducerMap } from "@ngrx/store";
import * as httpError from '@app/shared/store/reducers/http-error.reducer';
import * as register from "@app/modules/register/store/reducers/register.reducer";
import * as login from "@app/modules/login/store/reducers/login.reducer";
import * as passwordReset from "@app/modules/password-reset/store/reducers/password-reste.reducer";
import * as auth from "@app/modules/auth/store/reducers/auth.reducer";
import * as profile from '@app/modules/profile/store/reducers/profile.reducer';

export interface AppState {
	httpError: httpError.HttpErrorState,
	register: register.RegisterState,
	login: login.LoginState,
	passwordReset: passwordReset.PasswordResetState,
	auth: auth.AuthState,
	profile: profile.ProfileState,
}

export const appReducers: ActionReducerMap<AppState> = {
	httpError: httpError.httpErrorReducer,
	register: register.registerReducer,
	login: login.loginReducer,
	passwordReset: passwordReset.passwordResetReducer,
	auth: auth.authReducer,
	profile: profile.profileReducer,
}