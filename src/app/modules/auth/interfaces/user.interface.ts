
export interface User {
	id:                   string;
	name:                 string;
	username:             string;
	description:          null | string;
	image:                Image | null;
	readable_joined_date: string;
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
