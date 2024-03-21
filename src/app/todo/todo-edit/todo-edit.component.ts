import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TodoTaskService } from '../todo-task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TodoTask } from '../todo-task.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-todo-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './todo-edit.component.html',
  styleUrl: './todo-edit.component.css',
})
export class TodoEditComponent {
  todoTaskEditForm: FormGroup;
  taskIndexToUpdate: number;
  taskToUpdate: TodoTask;

  constructor(
    private todoTaskService: TodoTaskService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.taskIndexToUpdate = +this.route.snapshot.params['index'];
    this.taskToUpdate = this.todoTaskService.getTodoByIndex(
      this.taskIndexToUpdate
    );

    this.todoTaskEditForm = new FormGroup({
      title: new FormControl(this.taskToUpdate.title, [
        Validators.required,
        Validators.maxLength(250),
      ]),
      description: new FormControl(this.taskToUpdate.description, [
        Validators.required,
      ]),
      dueDate: new FormControl(this.taskToUpdate.dueDate.slice(0, 16), [
        Validators.required,
        Validators.maxLength(2000),
      ]),
      category: new FormControl(this.taskToUpdate.category, [
        Validators.required,
        Validators.maxLength(2000),
      ]),
    });
  }

  onSubmit() {
    const id = this.taskToUpdate.id;
    const title = this.todoTaskEditForm.value.title;
    const description = this.todoTaskEditForm.value.description;
    const dueDate = this.todoTaskEditForm.value.dueDate;
    const category = this.todoTaskEditForm.value.category;
    const isoDate = new Date(dueDate).toISOString();

    this.todoTaskService.updateTodoTask(title, description, isoDate, category, id);
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
