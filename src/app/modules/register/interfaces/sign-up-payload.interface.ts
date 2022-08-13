import { SignUpDescription } from './register-response.interface';

export interface SignUpPayload {
	description: SignUpDescription,
	email: string | null,
	phone: string | null
	password: string
}