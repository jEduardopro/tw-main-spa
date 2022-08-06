
export type SignUpFieldType = 'signup_with_email' | 'signup_with_phone'

export interface RegisterResponse {
	message: string,
	description: SignUpFieldType,
	email?: string,
	phone?: string | number
}