import { AuthUser } from '@app/modules/auth/interfaces/auth-user.interface';

export interface SignUpResponse {
	message: string,
	token: string,
	user: AuthUser
}