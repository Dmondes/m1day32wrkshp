import { Component, inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { Todo } from '../models';

@Component({
  selector: 'app-todo',
  standalone: false,
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css'
})
export class TodoComponent implements OnInit {
form !: FormGroup;

private fb = inject(FormBuilder);

ngOnInit(): void {
  this.form = this.fb.group({
    description: this.fb.control<string>('', [Validators.required, Validators.minLength(5)]),
    priority: this.fb.control<string>('Low'),
    dueDate: this.fb.control<Date>(new Date(), [Validators.required, this.noPastDate])
  })
}

noPastDate(control: FormControl): ValidationErrors | null {
  if (!control.value) {
    return null; // Valid if empty
  }
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const inputDate = new Date(control.value);

  return inputDate >= today ? null : { pastDate: true }; 
}

@Output()
newTodo = new Subject<Todo>();

processform(){
  const todoTask: Todo = this.form.value as Todo;
  todoTask.completed = false;
  console.info("todo >>> ", todoTask);
  this.newTodo.next(todoTask);
  this.form.reset({
    description: '',
    priority: 'Low',
    dueDate: new Date()
  });
}
}
