import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { filter, map } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Post } from '../../models/post';
import { Store } from '@ngrx/store';
import { createPostRequest } from '../../state/posts.actions';

@Component({
  selector: 'app-post-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    RouterLink,
  ],
  templateUrl: './post-form.component.html',
})
export class PostFormComponent {
  public postForm = this.formBuilder.group({
    user: this.formBuilder.control('', [Validators.required]),
    content: this.formBuilder.control('', [
      Validators.required,
      Validators.minLength(50),
    ]),
  });

  public userErrors$ = this.postForm.statusChanges.pipe(
    map((x) => this.postForm.get('user') as AbstractControl),
    filter((x) => x != null),
    map((abstractControl) => {
      const errors = [];
      if (abstractControl.getError('required')) {
        errors.push('The user is required');
      }
      return errors;
    })
  );

  public contentErrors$ = this.postForm.statusChanges.pipe(
    map((x) => this.postForm.get('content') as AbstractControl),
    filter((x) => x != null),
    map((abstractControl) => {
      const errors = [];
      if (abstractControl.getError('required')) {
        errors.push('The content is required');
      }
      if (abstractControl.getError('minlength')) {
        errors.push('The post min length is 50');
      }
      return errors;
    })
  );

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private store: Store
  ) {}

  submit() {
    const user = this.postForm.value.user;
    const content = this.postForm.value.content;
    const postData: Post = {
      user: user ?? '',
      published: new Date(),
      content: content ?? '',
    };
    this.store.dispatch(createPostRequest({ post: postData }));
    this.router.navigate(['posts', 'list']);
  }
}
