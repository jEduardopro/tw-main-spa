
export type SignUpDescription = 'signup_with_email' | 'signup_with_phone'

export interface RegisterResponse {
	message: string,
	description: SignUpDescription,
	email?: string,
	phone?: string
}