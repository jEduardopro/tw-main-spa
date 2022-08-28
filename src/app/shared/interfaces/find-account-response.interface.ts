
export interface AccountInfoFound {
	username: string,
	email: string | null,
	phone: string | null
}

export interface FindAccountResponse {

	account_info: AccountInfoFound,
	message: string
	
}