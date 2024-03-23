import { Component, Input } from '@angular/core';
import { TodoTaskService } from '../../todo-task.service';
import { TodoTask } from '../../todo-task.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-todo-delete-modal',
  standalone: true,
  imports: [],
  templateUrl: './todo-delete-modal.component.html',
  styleUrl: './todo-delete-modal.component.css',
})
export class TodoDeleteModalComponent {
  @Input() todoTask: TodoTask;
  constructor(
    private todoTaskService: TodoTaskService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  onDelete() {
    this.todoTaskService.deleteTodoTask(this.todoTask.id);
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onBackdropClick(event: MouseEvent): void {
    const targetElement = event.target as HTMLElement;
    // Check if the click occurred outside of the modal content
    if (targetElement.classList.contains('backdrop')) {
      this.onCancel(); // Call your cancel or close modal method here
    }
  }

  onCancel() {
    this.todoTaskService.deleteClickedSubject.next(false);
  }
}
