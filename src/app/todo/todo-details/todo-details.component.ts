import { Component, OnDestroy, OnInit } from '@angular/core';
import { TodoTask } from '../todo-task.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { TodoTaskService } from '../todo-task.service';
import { Utility } from '../../Shared/Utility/Utility';
import { TodoDeleteModalComponent } from './todo-delete-modal/todo-delete-modal.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-todo-details',
  standalone: true,
  imports: [CommonModule, TodoDeleteModalComponent],
  templateUrl: './todo-details.component.html',
  styleUrl: './todo-details.component.css',
})
export class TodoDetailsComponent implements OnInit, OnDestroy {
  todoTask: TodoTask;
  taskIndex: number;
  formattedDueDate: string;
  formattedCreateDate: string;
  formattedUpdateDate: string;
  routeSubscription: Subscription;
  deleteSubscription: Subscription;
  deleteClicked: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private todoTaskService: TodoTaskService
  ) {}

  ngOnInit(): void {
    this.routeSubscription = this.route.params.subscribe((params: Params) => {
      this.taskIndex = params['index'];
      this.todoTask = this.todoTaskService.getTodoByIndex(this.taskIndex);

      this.formattedDueDate = Utility.getFormattedLocalDate(
        this.todoTask.dueDate
      );

      this.formattedCreateDate = Utility.getFormattedLocalDate(
        this.todoTask.created
      );

      this.formattedUpdateDate = Utility.getFormattedLocalDate(
        this.todoTask.updated
      );

      this.deleteSubscription = this.todoTaskService.deleteClickedSubject.subscribe((res) => {
        this.deleteClicked = res;
      });
    });
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
    this.deleteSubscription.unsubscribe();
  }

  onEdit() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  onDelete() {
    this.todoTaskService.deleteClickedSubject.next(true);
  }
}
