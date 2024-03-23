import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { HeaderComponent } from './header/header.component';
import { TodoComponent } from './todo/todo.component';
import { LoadingSpinnerComponent } from './Shared/Component/loading-spinner/loading-spinner.component';
import { TodoTaskService } from './todo/todo-task.service';
import { MessageHandleService } from './Shared/Service/message-handle.service';
import { AlertComponent } from './Shared/Component/alert/alert.component';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth/auth.service';
import { Subscription } from 'rxjs';

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
export class AppComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('bgImage') bgImage!: ElementRef<HTMLDivElement>; // Access the element using ViewChild
  public isLoading: boolean;
  public alertExist: boolean;
  public isAuthenticated = false;
  private isLoadingSubscription: Subscription;
  private alertExistSubscription: Subscription;
  private loginChangedSubscription: Subscription;

  constructor(
    private todoService: TodoTaskService,
    private messageHandleService: MessageHandleService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    initFlowbite();
    this.isLoadingSubscription = this.todoService.isLoading.subscribe(
      (isLoading) => {
        this.isLoading = isLoading;
      }
    );

    this.alertExistSubscription =
      this.messageHandleService.alertExist.subscribe((alertbool) => {
        this.alertExist = alertbool;
      });

    //IdentityServer Authentication
    this.loginChangedSubscription = this.authService.loginChanged.subscribe(
      (respond) => {
        this.isAuthenticated = respond;
      }
    );
  }

  ngOnDestroy(): void {
    this.isLoadingSubscription.unsubscribe();
    this.alertExistSubscription.unsubscribe();
    this.loginChangedSubscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    let xOffset = 0;
    let yOffset = 0;

    setInterval(() => {
      // Check if bgImage is defined
      if (this.bgImage) {
        this.bgImage.nativeElement.style.transform = `translateX(${xOffset}px) translateY(${yOffset}px)`;
        xOffset += 1;
        yOffset += 1;
        if (xOffset >= 1000) {
          xOffset = 0;
        }
        if (yOffset >= 998) {
          yOffset = 0;
        }
      }
    }, 20);
  }
}
