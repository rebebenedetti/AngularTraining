import { createAction, props } from '@ngrx/store';
import { Post } from '../models/post';

export const requestAllThePosts = createAction(
  '[Post list] request all the post'
);

export const loadPostsSuccess = createAction(
  '[Post list] load posts success',
  props<{ posts: Post[] }>()
);

export const loadPostsFailure = createAction(
  '[Post list] load posts failure',
  props<{ posts: Error }>()
);

export const createPostRequest = createAction(
  '[Post Form] Post creation request',
  props<{ post: Post }>()
);

export const deletePostRequest = createAction(
  '[Post Form] Delete post request',
  props<{ post: Post }>()
);

export const updatePostRequest = createAction(
  '[Post] Update selected Post',
  props<{ post: Post }>()
);
