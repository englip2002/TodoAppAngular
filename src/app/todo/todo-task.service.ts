import { TodoDataStorageServiceService } from '../Shared/todo-data-storage-service.service';
import { Injectable, OnInit } from '@angular/core';
import { TodoTask } from './todo-task.model';
import { map, Subject } from 'rxjs';
import { MessageHandleService } from '../Shared/message-handle.service';

@Injectable({
  providedIn: 'root',
})
export class TodoTaskService implements OnInit {
  private todoTaskList: TodoTask[];
  public todoTaskListChanged = new Subject<TodoTask[]>();
  public isLoading = new Subject<boolean>();

  constructor(
    private todoDataStorageServiceService: TodoDataStorageServiceService,
    private messageHandleService: MessageHandleService
  ) {}

  ngOnInit(): void {}

  getTodoList() {
    return this.todoTaskList.slice();
  }

  getTodoByIndex(index: number) {
    return this.todoTaskList[index];
  }

  getTodoById(id: number) {
    const todo = this.todoTaskList.find((x) => {
      x.id = id;
    });
    return todo;
  }

  // fetchTodoTasks() {
  //   this.todoDataStorageServiceService
  //     .getAllTodoTasks()
  //     .subscribe((wait) => {
  //       wait.subscribe(todoTask => {
  //         const filteredTasks = todoTask.filter((task) => !task.isDeleted);
  //         this.todoTaskList = filteredTasks;
  //         this.todoTaskListChanged.next(this.todoTaskList);
  //       })
  //     });
  // }

  fetchTodoTasks() {
    this.todoDataStorageServiceService
      .getAllTodoTasks()
      .subscribe((todoTasks) => {
        const filteredTasks = todoTasks.filter((task) => !task.isDeleted);
        this.todoTaskList = filteredTasks;
        this.todoTaskListChanged.next(this.todoTaskList);
      });
  }


  createTodoTask(
    title: string,
    description: string,
    dueDate: string,
    category: string
  ) {
    this.isLoading.next(true);
    this.todoDataStorageServiceService
      .createTodoTask(title, description, dueDate, category)
      .subscribe({
        next: (response) => {
          console.log(response);
          this.fetchTodoTasks();
          this.todoTaskListChanged.next(this.todoTaskList);
          this.sendSuccessMessage('Task created successfully!');
          this.isLoading.next(false);
        },
        error: (error) => {
          console.log(error);
          this.isLoading.next(false);
          this.sendErrorMessage(error);
        },
      });
  }

  updateTodoTask(
    title: string,
    description: string,
    dueDate: string,
    category: string,
    id: number
  ) {
    this.isLoading.next(true);
    this.todoDataStorageServiceService
      .updateTodoTask(title, description, dueDate, category, id)
      .subscribe({
        next: (response) => {
          console.log(response);
          this.fetchTodoTasks();
          this.todoTaskListChanged.next(this.todoTaskList);
          this.sendSuccessMessage('Task updated successfully!');
          this.isLoading.next(false);
        },
        error: (error) => {
          console.log(error);
          this.isLoading.next(false);
          this.sendErrorMessage(error);
        },
      });
  }

  deleteTodoTask(id: number) {
    this.isLoading.next(true);
    this.todoDataStorageServiceService.deleteTodoTask(id).subscribe({
      next: (response) => {
        console.log(response);
        this.fetchTodoTasks();
        this.todoTaskListChanged.next(this.todoTaskList);
        this.sendSuccessMessage('Task deleted successfully!');
        this.isLoading.next(false);
      },
      error: (error) => {
        console.log(error);
        this.isLoading.next(false);
        this.sendErrorMessage(error);
      },
    });
  }

  private sendSuccessMessage(message: string) {
    this.messageHandleService.message = message;
    this.messageHandleService.alertExist.next(true);
    this.messageHandleService.isSuccessMessage = true;
  }

  private sendErrorMessage(error: any) {
    this.messageHandleService.message =
      error.status + ': Unknown error occured!';
    this.messageHandleService.alertExist.next(true);
    this.messageHandleService.isSuccessMessage = false;
  }
}
