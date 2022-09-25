import { User } from '@app/modules/auth/interfaces/user.interface';

export interface SignUpResponse {
	message: string,
	token: string,
	user: User
}