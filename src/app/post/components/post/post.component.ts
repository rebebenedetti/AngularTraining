import { Component, Input } from '@angular/core';
import { Post } from '../../models/post';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})

//DumpComponent
export class PostComponent {
  buttonText: string = "VIEW MORE";
  showFullContent: boolean = false;
  contentClasses: string = 'line-clamp-2';
  constructor() { }

  @Input()
  post!: Post;

  ngOnInit() {
  }

  ViewMoreOrLessContent() {
    this.showFullContent = !this.showFullContent;
    this.buttonText = this.showFullContent ? 'VIEW LESS' : 'VIEW MORE';
    this.contentClasses = this.showFullContent ? '' : 'line-clamp-2';
  }
}
