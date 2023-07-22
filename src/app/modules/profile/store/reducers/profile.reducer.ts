import { Tweet } from '@app/modules/tweets/interfaces/tweet.interface';
import { createReducer, on } from '@ngrx/store';
import { Profile } from '../../interfaces/profile.interface';
import {
	setProfile, setCurrentPage, setTweetsLoaded, setTweetsAndRepliesLoaded,
	setCurrentRepliesPage, setFollowersLoaded, setCurrentFollowersPage, incrementFollowingCount, decrementFollowingCount, setCurrentFollowingPage, setFollowingLoaded
} from '../actions/profile.actions';

export const profileFeatureKey = 'profile'

export interface ProfileState {
	profile: Profile | null,
	page: number,
	tweets: Tweet[],
	tweetsReplies: Tweet[],
	repliesPage: number
	followers: Profile[],
	followersPage: number,
	following: Profile[],
	followingPage: number
};

const initialState: ProfileState = {
	profile: null,
	page: 1,
	tweets: [],
	tweetsReplies: [],
	repliesPage: 1,
	followers: [],
	followersPage: 1,
	following: [],
	followingPage: 1
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
	on(setCurrentFollowersPage, (state, { page }) => ({ ...state, followersPage: page })),
	on(setFollowingLoaded, (state, { following }) => ({ ...state, following })),
	on(setCurrentFollowingPage, (state, { page }) => ({ ...state, followingPage: page })),
	on(incrementFollowingCount, (state) => ({ ...state, profile: { ...state.profile!, following_count: state.profile!.following_count + 1 } })),
	on(decrementFollowingCount, (state) => ({ ...state, profile: { ...state.profile!, following_count: state.profile!.following_count - 1 } }))
);