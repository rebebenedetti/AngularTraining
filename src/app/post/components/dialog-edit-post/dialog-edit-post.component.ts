import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Post } from '../../models/post';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dialog-edit-post',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatDialogActions,
    MatDialogContent,
    MatDialogClose,
  ],
  templateUrl: './dialog-edit-post.component.html',
})
export class DialogEditPostComponent {
  postForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<DialogEditPostComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Post
  ) {
    this.postForm = this.formBuilder.group({
      user: [{ value: data.user, disabled: true }],
      content: [data.content, [Validators.required, Validators.minLength(50)]],
      published: [data.published, Validators.required],
    });
  }

  onSaveClick(): void {
    if (this.postForm.valid) {
      const user = this.data.user;
      const content = this.postForm.value.content;
      const updatedPost: Post = {
        user: user ?? '',
        published: new Date(),
        content: content ?? '',
      };
      this.dialogRef.close(updatedPost);
    }
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }
}
