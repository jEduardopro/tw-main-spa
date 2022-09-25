import { createAction, props } from '@ngrx/store';
import { User } from '../../interfaces/user.interface';

export const setAuthUser = createAction(
	'[AUTH] Set Auth User',
	props<{authUser:User}>()
);
