import { Component} from '@angular/core';
import { Todo } from './models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'day32';
  tasks : Todo[] = [];

  getToDo(event: Todo){
    console.info("received: ",event);
    this.tasks.push(event);
  }


}
