import { Injectable, OnDestroy } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Store, createAction, props } from '@ngrx/store';
import { Post } from '../../models/post';
import { Subject, map, takeUntil } from 'rxjs';

export const createPostRequest = createAction(
  '[Post Form] Post creation request',
  props<{ post: Partial<Post> }>()
);

export interface PostFormState {
  post?: Partial<Post>;
}

@Injectable()
export class PostFormComponentStore
  extends ComponentStore<PostFormState>
  implements OnDestroy
{
  //Updates
  public updatePost = this.updater((state, post: Partial<Post>) => {
    return {
      ...state,
      post,
    };
  });

  public onDestroy$ = new Subject<void>();

  //Selectors
  public post$ = this.select((state) => state.post);

  constructor(private store: Store) {
    super({});
  }

  createPost() {
    this.post$
      .pipe(
        takeUntil(this.onDestroy$),
        map((value) => {
          if (value) {
            this.store.dispatch(createPostRequest({ post: value }));
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
