import { Injectable, OnDestroy } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Store, createAction, props } from '@ngrx/store';
import { Post } from '../../models/post';
import { Actions } from '@ngrx/effects';
import { Subject, map, takeUntil } from 'rxjs';

export const updatePostRequest = createAction(
  '[Post] Update selected Post',
  props<{ post: Post }>()
);

export const deletePostRequest = createAction(
  '[Post Form] Delete post request',
  props<{ post: Post }>()
);

export interface PostState {
  post?: Post;
}

@Injectable()
export class PostComponentStore
  extends ComponentStore<PostState>
  implements OnDestroy
{
  // Updates
  public updatePost = this.updater((state, post: Post) => {
    return {
      ...state,
      post,
    };
  });

  //Selectors
  public post$ = this.select((state) => state.post);

  public onDestroy$ = new Subject<void>();

  constructor(private store: Store, private actions$: Actions) {
    super({});
  }

  public setPost(post: Post) {
    this.updatePost(post);
  }

  public editPost() {
    this.post$
      .pipe(
        takeUntil(this.onDestroy$),
        map((value) => {
          if (value) {
            this.store.dispatch(updatePostRequest({ post: value }));
          }
        })
      )
      .subscribe();
  }

  public deletePost() {
    this.post$
      .pipe(
        takeUntil(this.onDestroy$),
        map((value) => {
          if (value) {
            this.store.dispatch(deletePostRequest({ post: value }));
          }
        })
      )
      .subscribe();
  }

  override ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.unsubscribe();
  }
}
