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

  fetchTodoTasks() {
    this.todoDataStorageServiceService.getAllTodoTasks().then((res) => {
      res.subscribe((data) => {
        this.todoTaskList = data.filter((x) => x.isDeleted == false);
        this.todoTaskListChanged.next(this.todoTaskList);
      });
    });
  }

  // fetchTodoTasks() {
  //   this.isLoading.next(true);
  //   this.todoDataStorageServiceService.getAllTodoTasks().then(res => {
  //     this.todoTaskList = res;
  //   })
  // }

  createTodoTask(
    title: string,
    description: string,
    dueDate: string,
    category: string
  ) {
    this.isLoading.next(true);
    this.todoDataStorageServiceService
      .createTodoTask(title, description, dueDate, category)
      .then((res) => {
        res.subscribe({
          next: (response) => {
            console.log(response);
            this.todoTaskListChanged.next(this.todoTaskList);
            this.sendSuccessMessage('Task created successfully!');
            //get updated list
            this.fetchTodoTasks();
            this.isLoading.next(false);
          },
          error: (error) => {
            console.log(error);
            this.isLoading.next(false);
            this.sendErrorMessage(error);
          },
        });
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
      .then((res) => {
        res.subscribe({
          next: (response) => {
            console.log(response);
            this.todoTaskListChanged.next(this.todoTaskList);
            this.sendSuccessMessage('Task updated successfully!');
            //get updated list
            this.fetchTodoTasks();
            this.isLoading.next(false);
          },
          error: (error) => {
            console.log(error);
            this.isLoading.next(false);
            this.sendErrorMessage(error);
          },
        });
      });
  }

  deleteTodoTask(id: number) {
    this.isLoading.next(true);
    this.todoDataStorageServiceService.deleteTodoTask(id).then((res) => {
      res.subscribe({
        next: (response) => {
          console.log(response);
          this.todoTaskListChanged.next(this.todoTaskList);
          this.sendSuccessMessage('Task deleted successfully!');
          //get updated list
          this.fetchTodoTasks();
          this.isLoading.next(false);
        },
        error: (error) => {
          console.log(error);
          this.isLoading.next(false);
          this.sendErrorMessage(error);
        },
      });
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
