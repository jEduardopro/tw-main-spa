export interface Tweet {
	id:                     string;
	owner:                  Owner;
	body:                   string;
	images:                 Image[];
	mentions:               Owner[];
	retweets_count:         number;
	replies_count:          number;
	likes_count:            number;
	creation_date_readable: string;
	created_at:             string;
}

export interface Image {
	id:          string;
	url:         string;
	conversions: Conversions;
	created_at:  string;
}

export interface Conversions {
	large:  string;
	small:  string;
	thumb:  string;
	medium: string;
}

export interface Owner {
	id:                   string;
	name:                 string;
	username:             string;
	description:          string | null;
	image:                Image | null;
	readable_joined_date: string;
}
