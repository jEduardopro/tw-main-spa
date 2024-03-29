import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProfileState, profileFeatureKey } from '../reducers/profile.reducer';


export const profileFeatureState = createFeatureSelector<ProfileState>(profileFeatureKey)

export const selectProfileInfo = createSelector(
	profileFeatureState,
	(state) => state.profile
);

export const selectProfileId = createSelector(
	profileFeatureState,
	(state) => state.profile?.id
);

export const selectProfileName = createSelector(
	profileFeatureState,
	(state) => state.profile?.name
);

export const selectProfileUsername = createSelector(
	profileFeatureState,
	(state) => state.profile?.username
);

export const selectProfileImage = createSelector(
	profileFeatureState,
	(state) => state.profile?.image
);

export const selectProfileBanner = createSelector(
	profileFeatureState,
	(state) => state.profile?.banner
);

export const selectCurrentPage = createSelector(
	profileFeatureState,
	(state) => state.page
);
export const selectTweetsLoaded = createSelector(
	profileFeatureState,
	(state) => state.tweets
);

export const selectCurrentRepliesPage = createSelector(
	profileFeatureState,
	(state) => state.repliesPage
);

export const selectTweetsAndRepliesLoaded = createSelector(
	profileFeatureState,
	(state) => state.tweetsReplies
);

export const selectFollowers = createSelector(
	profileFeatureState,
	(state) => state.followers
);

export const selectCurrentFollowersPage = createSelector(
	profileFeatureState,
	(state) => state.followersPage
);

export const selectFollowing = createSelector(
	profileFeatureState,
	(state) => state.following
);

export const selectCurrentFollowingPage = createSelector(
	profileFeatureState,
	(state) => state.followingPage
);