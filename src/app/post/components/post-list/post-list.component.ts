import { Component } from '@angular/core';
import { PostComponent } from '../post/post.component';
import { Post } from '../../models/post';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { requestAllThePosts } from '../../state/posts.actions';
import { Observable, filter, take, tap } from 'rxjs';
import {
  getPosts,
  getPostsCount,
  getPostsLoaded,
} from '../../state/posts.selectors';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PostFormComponent } from '../post-form/post-form.component';
@Component({
  selector: 'app-post-list',
  standalone: true,
  templateUrl: './post-list.component.html',
  imports: [
    CommonModule,
    PostComponent,
    PostFormComponent,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
})

//SmartComponent
export class PostListComponent {
  posts$: Observable<Post[]> = this.store.select(getPosts);
  postsLoaded$: Observable<boolean> = this.store.select(getPostsLoaded);
  postsCount$ = this.store.select(getPostsCount);

  constructor(private router: Router, private store: Store) {}

  ngOnInit() {
    this.postsLoaded$
      .pipe(
        filter((x) => !x),
        take(1),
        tap(() => this.store.dispatch(requestAllThePosts()))
      )
      .subscribe();
  }

  addPost() {
    this.router.navigate(['posts/create']);
  }
}
