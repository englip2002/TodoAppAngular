import { Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TodoTask } from '../../todo-task.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.css',
})
export class TodoItemComponent implements OnInit {
  @Input() todoTask: TodoTask;
  @Input() index;
  public category: string;

  constructor() {}

  ngOnInit(): void {
    const dueDate = new Date(this.todoTask.dueDate).getTime();

    if (dueDate < Date.now()) {
      this.category = 'Expired';
    } else if (dueDate - 1 * 60 * 60 * 1000 < Date.now()) {
      this.category = 'Due';
    } else {
      this.category = 'Active';
    }
  }
}
