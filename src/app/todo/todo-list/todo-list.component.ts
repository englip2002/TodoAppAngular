import { Component, OnInit } from '@angular/core';
import { TodoTask } from '../todo-task.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TodoItemComponent } from './todo-item/todo-item.component';
import { TodoTaskService } from '../todo-task.service';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, RouterModule, TodoItemComponent],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css',
})
export class TodoListComponent implements OnInit {
  todoTaskList: TodoTask[];

  constructor(private todoService: TodoTaskService) {}

  ngOnInit(): void {
    this.todoTaskList = this.todoService.getTodoList();
    this.todoService.todoTaskListChanged.subscribe((todoList) => {
      this.todoTaskList = todoList;
    });
  }
}
