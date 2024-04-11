import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostComponent } from './components/post/post.component';
import { PostListComponent } from './components/post-list/post-list.component';
import { HttpClientModule } from '@angular/common/http';
import { PostsService } from './posts.service';
import { POST_SERVICE_URL } from './injection-token/post-service-url';
@NgModule({
  declarations: [],
  imports: [
    CommonModule, PostListComponent,
    PostComponent, HttpClientModule
  ],
  providers:[{
    provide: POST_SERVICE_URL,
    useValue: "https://asmisalan.github.io/feedgram/posts.json"
  },
    PostsService
  ],
  exports: [PostListComponent
  ]
})
export class PostModule { }
