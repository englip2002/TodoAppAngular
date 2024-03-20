import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { HeaderComponent } from './header/header.component';
import { TodoComponent } from './todo/todo.component';
import { LoadingSpinnerComponent } from './Shared/loading-spinner/loading-spinner.component';
import { TodoTaskService } from './todo/todo-task.service';
import { MessageHandleService } from './Shared/message-handle.service';
import { AlertComponent } from './Shared/alert/alert.component';
import { CommonModule } from '@angular/common';
import { AuthService } from './Shared/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule,
    CommonModule,
    HeaderComponent,
    TodoComponent,
    LoadingSpinnerComponent,
    AlertComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  isLoading: boolean;
  alertExist: boolean;
  public userAuthenticated = false;

  constructor(
    private todoService: TodoTaskService,
    private messageHandleService: MessageHandleService,
    private authService: AuthService
  ) {
    this.authService.loginChanged.subscribe((userAuthenticated) => {
      this.userAuthenticated = userAuthenticated;
    });
  }

  ngOnInit(): void {
    initFlowbite();
    this.todoService.isLoading.subscribe((isLoading) => {
      this.isLoading = isLoading;
    });

    this.messageHandleService.alertExist.subscribe((alertbool) => {
      this.alertExist = alertbool;
    });

    this.authService.isAuthenticated().then((userAuthenticated) => {
      this.userAuthenticated = userAuthenticated;
    });
  }
}
