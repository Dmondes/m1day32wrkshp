import { Component, Input, Output } from '@angular/core';
import { Todo } from '../models';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-task',
  standalone: false,
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent {

  @Input()
  appTasks: Todo[] = [];

  @Output()
  updateCartEvent = new Subject<Todo[]>(); 

  onRemove(event: any){
    this.updateCartEvent.next(this.appTasks);
  }

}
