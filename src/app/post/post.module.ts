import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { PostsService } from './posts.service';
import { POST_SERVICE_URL } from './injection-token/post-service-url';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'list',
    loadComponent: () =>
      import('./components/post-list/post-list.component').then(
        (x) => x.PostListComponent
      ),
  },
  {
    path: 'create',
    loadComponent: () =>
      import('./components/post-form/post-form.component').then(
        (x) => x.PostFormComponent
      ),
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./components/home/home.component').then((x) => x.HomeComponent),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, HttpClientModule, RouterModule.forChild(routes)],
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
