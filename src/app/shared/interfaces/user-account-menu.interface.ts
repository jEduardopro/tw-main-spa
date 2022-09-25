import { Image } from "@app/modules/auth/interfaces/user.interface";

export interface UserAccountMenu {
	name: string,
	username: string,
	image: Image | null
}