import { createFeatureSelector, createSelector } from '@ngrx/store';
import { POSTS_STATE_KEY, PostState } from './posts.reducer';

export const getPostsState = createFeatureSelector<PostState>(POSTS_STATE_KEY);

export const getPosts = createSelector(
  getPostsState,
  (state) => state.posts ?? []
);

export const getPostsCount = createSelector(getPosts, (state) => state?.length);

export const getPostsLoaded = createSelector(
  getPostsState,
  (state) => state.loaded
);
