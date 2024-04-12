import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Post } from './models/post';
import { POST_SERVICE_URL } from './injection-token/post-service-url';
import { map, take } from 'rxjs';

@Injectable()
export class PostsService {
  public allPosts: Post[] = [];

  constructor(
    @Inject(POST_SERVICE_URL) public serviceURL: string,
    private httpClient: HttpClient
  ) {
    this.httpClient
      .get<Post[]>(this.serviceURL)
      .pipe(
        take(1),
        map((posts) => posts.map((post) => this.allPosts.push(post)))
      )
      .subscribe();
  }

  addPost(post: Post) {
    this.allPosts.push(post);
  }
}
