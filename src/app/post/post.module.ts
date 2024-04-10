import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostComponent } from './components/post/post.component';
import { PostListComponent } from './components/post-list/post-list.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,PostListComponent,
    PostComponent
  ],
  exports: [PostListComponent
  ]
})
export class PostModule { }
