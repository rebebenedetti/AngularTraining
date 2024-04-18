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
