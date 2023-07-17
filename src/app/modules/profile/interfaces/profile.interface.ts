import { Image, User } from '../../auth/interfaces/user.interface';

export interface Profile extends User {
	banner:               Image | null;
	following_count:      number;
	followers_count: 			number;
	following:						boolean;
}
