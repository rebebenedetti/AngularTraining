import { Component, Input } from '@angular/core';
import { Post } from '../../models/post';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import {
  deletePostRequest,
  updatePostRequest,
} from '../../state/posts.actions';
import { MatDialog } from '@angular/material/dialog';
import { DialogEditPostComponent } from '../dialog-edit-post/dialog-edit-post.component';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './post.component.html',
})

//DumpComponent
export class PostComponent {
  buttonText: string = 'VIEW MORE';
  showFullContent: boolean = false;
  contentClasses: string = 'line-clamp-2';

  constructor(private store: Store, public dialog: MatDialog) {}

  @Input()
  post!: Post;

  viewMoreOrLessContent() {
    this.showFullContent = !this.showFullContent;
    this.buttonText = this.showFullContent ? 'VIEW LESS' : 'VIEW MORE';
    this.contentClasses = this.showFullContent ? '' : 'line-clamp-2';
  }

  deletePost() {
    this.store.dispatch(deletePostRequest({ post: this.post }));
  }

  openEditPostDialog(): void {
    const dialogRef = this.dialog.open(DialogEditPostComponent, {
      width: '700px',
      height: '500px',
      data: this.post,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.store.dispatch(updatePostRequest({ post: result }));
    });
  }
}
