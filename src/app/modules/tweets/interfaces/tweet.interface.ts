import { User, Image } from '@app/modules/auth/interfaces/user.interface';
export interface Tweet {
	id:                     string;
	owner:                  User;
	body:                   string;
	images:                 Image[];
	retweets_count:         number;
	retweeted:              boolean;
	replies_count:          number;
	likes_count:            number;
	liked:                  boolean;
	creation_date_readable: string;
	created_at:             string;
	reply_to?:              Tweet;
	mentions:								User[];
}
