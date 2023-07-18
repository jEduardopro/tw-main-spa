import { Tweet } from '@app/modules/tweets/interfaces/tweet.interface';
import { createReducer, on } from '@ngrx/store';
import { Profile } from '../../interfaces/profile.interface';
import {
	setProfile, setCurrentPage, setTweetsLoaded, setTweetsAndRepliesLoaded,
	setCurrentRepliesPage, setFollowersLoaded, setCurrentFollowersPage
} from '../actions/profile.actions';

export const profileFeatureKey = 'profile'

export interface ProfileState {
	profile: Profile | null,
	page: number,
	tweets: Tweet[],
	tweetsReplies: Tweet[],
	repliesPage: number
	followers: Profile[],
	followersPage: number
};

const initialState: ProfileState = {
	profile: null,
	page: 1,
	tweets: [],
	tweetsReplies: [],
	repliesPage: 1,
	followers: [],
	followersPage: 1
};

export const profileReducer = createReducer(
	initialState,
	on(
		setProfile,
		(state, {profile}) => ({...state, profile}),
	),
	on(setTweetsLoaded, (state, {tweets}) => ({...state, tweets})),
	on(setCurrentPage, (state, {page}) => ({...state, page})),
	on(setTweetsAndRepliesLoaded, (state, {tweets}) => ({...state, tweetsReplies: tweets})),
	on(setCurrentRepliesPage, (state, { page }) => ({ ...state, repliesPage: page })),
	on(setFollowersLoaded, (state, { followers }) => ({ ...state, followers })),
	on(setCurrentFollowersPage, (state, { page }) => ({ ...state, followersPage: page }))
);