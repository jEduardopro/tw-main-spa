import { Tweet } from '@app/modules/tweets/interfaces/tweet.interface';
import { createAction, props } from '@ngrx/store';
import { Profile } from '../../interfaces/profile.interface';

export const setProfile = createAction(
	'[PROFILE] Set profile information',
	props<{profile: Profile|null}>()
);

export const setTweetsLoaded = createAction(
	'[PROFILE] Set Tweets Loaded',
	props<{tweets: Tweet[]}>()
);

export const setCurrentPage = createAction(
	'[PROFILE] Set Current Page of tweets loaded',
	props<{page: number}>()
);

export const setTweetsAndRepliesLoaded = createAction(
	'[PROFILE] Set Tweets and Replies Loaded',
	props<{tweets: Tweet[]}>()
);

export const setCurrentRepliesPage = createAction(
	'[PROFILE] Set Current Page of tweets and replies loaded',
	props<{page: number}>()
);

export const toggleLoading = createAction(
	'[PROFILE] Toggle Loading',
	props<{status: boolean}>()
)