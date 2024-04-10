import { Component } from '@angular/core';
import { PostModule } from './post/post.module';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet, PostModule]
})
export class AppComponent {
  title = 'AngularTraining';
}
