import { Component, OnDestroy } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Subject, filter, map } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Post } from '../../models/post';
import { PostFormComponentStore } from './post-form.component.store';

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
  providers: [PostFormComponentStore],
  templateUrl: './post-form.component.html',
})
export class PostFormComponent implements OnDestroy {
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

  public onDestroy$ = new Subject<void>();

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private postFormComponentStore: PostFormComponentStore
  ) {
    this.postForm.valueChanges
      .pipe(
        map((value) => {
          const post: Partial<Post> = {
            user: value.user ?? '',
            content: value.content ?? '',
          };
          this.postFormComponentStore.updatePost(post);
        })
      )
      .subscribe();
  }

  submit() {
    this.postFormComponentStore.createPost();
    this.router.navigate(['posts', 'list']);
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.unsubscribe();
  }
}
