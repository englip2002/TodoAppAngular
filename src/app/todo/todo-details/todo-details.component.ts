import { Component, OnDestroy, OnInit } from '@angular/core';
import { TodoTask } from '../todo-task.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TodoTaskService } from '../todo-task.service';

@Component({
  selector: 'app-todo-details',
  standalone: true,
  imports: [],
  templateUrl: './todo-details.component.html',
  styleUrl: './todo-details.component.css',
})
export class TodoDetailsComponent implements OnInit, OnDestroy {
  todoTask: TodoTask;
  taskIndex: number;
  subscription: Subscription;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private todoTaskService: TodoTaskService
  ) {}

  ngOnInit(): void {
    this.subscription = this.route.params.subscribe((params: Params) => {
      this.taskIndex = params['index'];
      this.todoTask = this.todoTaskService.getTodoByIndex(this.taskIndex);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onEdit() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  onDelete() {
    this.todoTaskService.deleteTodoTask(this.todoTask.id);
    this.todoTaskService.fetchTodoTasks();
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
