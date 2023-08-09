export interface User {
	id:                   string;
	name:                 string;
	username:             string;
	email:             		string|null;
	phone:             		string|null;
	country:             	string|null;
	gender:             	string|null;
	description:          null | string;
	date_birth:					  null | string;
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
