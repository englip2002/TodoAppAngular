import { CommonModule } from '@angular/common';
import { TodoTaskService } from './../todo-task.service';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-todo-create',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './todo-create.component.html',
  styleUrl: './todo-create.component.css',
})
export class TodoCreateComponent implements OnInit {
  todoTaskCreateForm: FormGroup;

  constructor(
    private todoTaskService: TodoTaskService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.todoTaskCreateForm = new FormGroup({
      title: new FormControl(null, [
        Validators.required,
        Validators.maxLength(250),
      ]),
      description: new FormControl(null, [
        Validators.required,
        Validators.maxLength(2000),
      ]),
      dueDate: new FormControl(null, [
        Validators.required,
        this.validateDate.bind(this),
      ]),
      category: new FormControl(null, [
        Validators.required,
        Validators.maxLength(2000),
      ]),
    });
  }

  private validateDate(control: FormControl): { [s: string]: boolean } {
    if (control.value < Date.now) {
      return { invalidDate: true };
    }
    return null;
  }

  onSubmit() {
    const title = this.todoTaskCreateForm.value.title;
    const description = this.todoTaskCreateForm.value.description;
    const dueDate = this.todoTaskCreateForm.value.dueDate;
    const category = this.todoTaskCreateForm.value.category;
    const isoDate = new Date(dueDate).toISOString();

    this.todoTaskService.createTodoTask(title, description, isoDate, category);
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
