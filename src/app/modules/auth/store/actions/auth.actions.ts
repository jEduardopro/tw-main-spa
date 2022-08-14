import { createAction, props } from '@ngrx/store';
import { AuthUser } from '../../interfaces/auth-user.interface';

export const setAuthUser = createAction(
	'[AUTH] Set Auth User',
	props<{authUser:AuthUser}>()
);
