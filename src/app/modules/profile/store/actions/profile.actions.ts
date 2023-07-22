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

export const setFollowersLoaded = createAction(
	'[PROFILE] Set Followers Loaded',
	props<{followers: Profile[]}>()
);

export const setCurrentFollowersPage = createAction(
	'[PROFILE] Set Current Page of followers loaded',
	props<{page: number}>()
);

export const setFollowingLoaded = createAction(
	'[PROFILE] Set Following Loaded',
	props<{following: Profile[]}>()
);

export const setCurrentFollowingPage = createAction(
	'[PROFILE] Set Current Page of Following loaded',
	props<{page: number}>()
);

export const incrementFollowingCount = createAction(
	'[PROFILE] Increment following count'
)

export const decrementFollowingCount = createAction(
	'[PROFILE] Decrement following count'
)