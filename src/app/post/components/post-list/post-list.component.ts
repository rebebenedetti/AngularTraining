import { Component } from '@angular/core';
import { PostComponent } from "../post/post.component";
import { Post } from '../../models/post';
import { CommonModule } from '@angular/common';
import { PostsService } from '../../posts.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-post-list',
  standalone: true,
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.scss',
  imports: [CommonModule, PostComponent]
})

//SmartComponent
export class PostListComponent {

  public posts$!: Observable<Post[]>;

  constructor(private postService: PostsService) { }

  ngOnInit() {
    this.posts$ = this.postService.getAllPost();
  }

}
