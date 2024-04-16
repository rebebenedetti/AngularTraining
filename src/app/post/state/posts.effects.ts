import { Inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, delay, map, of, switchMap } from 'rxjs';
import {
  requestAllThePosts,
  loadPostsSuccess,
  loadPostsFailure,
} from './posts.actions';
import { POST_SERVICE_URL } from '../injection-token/post-service-url';
import { HttpClient } from '@angular/common/http';
import { Post } from '../models/post';

@Injectable()
export class PostsEffects {
  requestPosts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(requestAllThePosts),
      switchMap(() =>
        this.httpClient.get<Post[]>(this.serviceURL).pipe(
          delay(2000),
          map((posts) => loadPostsSuccess({ posts }))
        )
      ),
      catchError(async (error) => loadPostsFailure({ posts: error }))
    )
  );

  constructor(
    private actions$: Actions,
    @Inject(POST_SERVICE_URL) public serviceURL: string,
    private httpClient: HttpClient
  ) {}
}
