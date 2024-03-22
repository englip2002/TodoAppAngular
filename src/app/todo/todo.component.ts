import { Component, OnInit } from '@angular/core';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoDetailsComponent } from './todo-details/todo-details.component';
import { RouterModule } from '@angular/router';
import { TodoTaskService } from './todo-task.service';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [RouterModule, TodoListComponent, TodoDetailsComponent],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css',
})
export class TodoComponent implements OnInit {
  constructor(private todoTaskService: TodoTaskService) {
    // this.todoTaskService.fetchTodoTasks();
  }
  ngOnInit(): void {

  }
}
