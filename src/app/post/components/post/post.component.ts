import { Component, Input, OnInit } from '@angular/core';
import { Post } from '../../models/post';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { DialogEditPostComponent } from '../dialog-edit-post/dialog-edit-post.component';
import { PostComponentStore } from './post.component.store';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  providers: [PostComponentStore],
  templateUrl: './post.component.html',
})

//DumbComponent
export class PostComponent implements OnInit {
  buttonText: string = 'VIEW MORE';
  showFullContent: boolean = false;
  contentClasses: string = 'line-clamp-2';

  constructor(
    public dialog: MatDialog,
    private postComponentStore: PostComponentStore
  ) {}

  ngOnInit(): void {
    this.postComponentStore.setPost(this.post);
  }

  @Input()
  post!: Post;

  viewMoreOrLessContent() {
    this.showFullContent = !this.showFullContent;
    this.buttonText = this.showFullContent ? 'VIEW LESS' : 'VIEW MORE';
    this.contentClasses = this.showFullContent ? '' : 'line-clamp-2';
  }

  deletePost() {
    this.postComponentStore.deletePost();
  }

  openEditPostDialog(): void {
    const dialogRef = this.dialog.open(DialogEditPostComponent, {
      width: '700px',
      height: '500px',
      data: this.post,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.postComponentStore.setPost(result);
      this.postComponentStore.editPost();
    });
  }
}
