
export interface PasswordResetPayload {
	password: string,
	password_confirmation: string,
	flow_token: string
}