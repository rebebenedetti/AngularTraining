import { Component } from '@angular/core';
import { PostComponent } from '../post/post.component';
import { Post } from '../../models/post';
import { CommonModule } from '@angular/common';
import { PostsService } from '../../posts.service';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
@Component({
  selector: 'app-post-list',
  standalone: true,
  templateUrl: './post-list.component.html',
  imports: [CommonModule, PostComponent, MatButtonModule],
})

//SmartComponent
export class PostListComponent {
  public posts!: Post[];

  constructor(private postService: PostsService, private router: Router) {}

  ngOnInit() {
    this.posts = this.postService.allPosts;
  }

  AddPost() {
    this.router.navigate(['posts/create']);
  }
}
