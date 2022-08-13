import { createAction, props } from "@ngrx/store";
import { UserFormData } from '../../models/user-form.model';
import { RegisterResponse } from '../../interfaces/register-response.interface';


export const setUserFormData = createAction(
	'[REGISTER] Set User Form Data',
	props<{userFormData: UserFormData}>()
);

export const setRegisterResponse = createAction(
	'[REGISTER] Set Response of Register',
	props<{registerResponse: RegisterResponse}>()
);

export const toggleLoading = createAction(
	'[REGISTER] Toggle Loading',
	props<{status: boolean}>()
);