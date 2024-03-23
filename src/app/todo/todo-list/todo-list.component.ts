import { Component, OnDestroy, OnInit } from '@angular/core';
import { TodoTask } from '../todo-task.model';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { TodoItemComponent } from './todo-item/todo-item.component';
import { TodoTaskService } from '../todo-task.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, RouterModule, TodoItemComponent],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css',
})
export class TodoListComponent implements OnInit, OnDestroy {
  public todoTaskList: TodoTask[];
  private todoTaskListSubscription: Subscription;

  constructor(private todoTaskService: TodoTaskService) {}

  ngOnInit(): void {
    this.todoTaskListSubscription =
      this.todoTaskService.todoTaskListSubject.subscribe((todoList) => {
        this.todoTaskList = todoList;
      });
    this.todoTaskService.fetchTodoTasks();
  }

  ngOnDestroy(): void {
    this.todoTaskListSubscription.unsubscribe;
  }
}
