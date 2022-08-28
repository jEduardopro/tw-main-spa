import { AuthUser } from '@app/modules/auth/interfaces/auth-user.interface';

export interface LoginResponse {
	message: string,
	token: string,
	user: AuthUser
}