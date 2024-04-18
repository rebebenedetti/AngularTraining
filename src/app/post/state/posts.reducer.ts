import { Action, createReducer, on } from '@ngrx/store';
import { Post } from '../models/post';
import { requestAllThePosts, loadPostsSuccess } from './posts.actions';
import {
  deletePostRequest,
  updatePostRequest,
} from '../components/post/post.component.store';
import { createPostRequest } from '../components/post-form/post-form.component.store';

export const POSTS_STATE_KEY = 'posts';

export interface PostState {
  posts: Post[];
  loaded: boolean;
}

export const initialState: PostState = {
  posts: [],
  loaded: false,
};

export const postsReducer = createReducer(
  initialState,
  on(requestAllThePosts, (state, action) => {
    return { ...state };
  }),
  on(loadPostsSuccess, (state, action) => {
    return {
      ...state,
      posts: action.posts,
      loaded: true,
    };
  }),
  on(createPostRequest, (state, action) => {
    const newPosts: Post[] = state.posts.slice();
    const newPost: Post = { ...action.post, published: new Date() };
    newPosts.push(newPost);
    return {
      ...state,
      posts: newPosts,
    };
  }),
  on(deletePostRequest, (state, action) => {
    const updatedPosts = state.posts.filter((post) => post !== action.post);
    return {
      ...state,
      posts: updatedPosts,
    };
  }),
  on(updatePostRequest, (state, action) => {
    const updatedPosts = state.posts.map((post) =>
      post.user === action.post.user ? action.post : post
    );
    return {
      ...state,
      posts: updatedPosts,
    };
  })
);

export function reducer(state: PostState | undefined, action: Action) {
  return postsReducer(state, action);
}
