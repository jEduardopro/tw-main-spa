import { User } from '@app/modules/auth/interfaces/user.interface';

export interface LoginResponse {
	message: string,
	token: string,
	user: User
}