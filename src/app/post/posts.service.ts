import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Post } from './models/post';
import { POST_SERVICE_URL } from './injection-token/post-service-url';

@Injectable()
export class PostsService {

  constructor(@Inject(POST_SERVICE_URL) public serviceURL: string, private httpClient: HttpClient) { }

  getAllPost() {
    return this.httpClient.get<Post[]>(this.serviceURL)
  }
}
