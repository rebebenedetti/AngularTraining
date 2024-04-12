import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostComponent } from './components/post/post.component';
import { PostListComponent } from './components/post-list/post-list.component';
import { HttpClientModule } from '@angular/common/http';
import { PostsService } from './posts.service';
import { POST_SERVICE_URL } from './injection-token/post-service-url';
import { PostFormComponent } from './components/post-form/post-form.component';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

export const routes: Routes = [
  {
    path: 'list',
    component: PostListComponent,
  },
  {
    path: 'create',
    component: PostFormComponent,
  },
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full',
  },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PostListComponent,
    PostComponent,
    PostFormComponent,
    HttpClientModule,
    RouterModule.forChild(routes),
    MatButtonModule,
  ],
  providers: [
    {
      provide: POST_SERVICE_URL,
      useValue: 'https://asmisalan.github.io/feedgram/posts.json',
    },
    PostsService,
  ],
  exports: [],
})
export class PostModule {}
