import { Component } from '@angular/core';
import { PostComponent } from "../post/post.component";
import { Post } from '../../models/post';
import { CommonModule } from '@angular/common';
import { data } from '../../../data';

@Component({
    selector: 'app-post-list',
    standalone: true,
    templateUrl: './post-list.component.html',
    styleUrl: './post-list.component.scss',
    imports: [CommonModule, PostComponent]
})
export class PostListComponent {

  posts = data;

}
