
export type ResetDescription = 'reset_password_by_email' | 'reset_password_by_phone'

export interface SendPasswordResetPayload {
	description: ResetDescription,
	email: string | null,
	phone: string | null,
	flow_token: string
}