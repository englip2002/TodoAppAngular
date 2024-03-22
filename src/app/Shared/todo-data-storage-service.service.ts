import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TodoTask } from '../todo/todo-task.model';
// import { AuthService } from './auth.service';
import { from } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class TodoDataStorageServiceService {
  constructor(
    private httpClient: HttpClient,
    private _authService: AuthService
  ) {}

  async getAllTodoTasks() {
    return await this.httpClient.get<TodoTask[]>(
      'https://localhost:7097/api/TodoTasks',
    );
  }

  async createTodoTask(
    title: string,
    description: string,
    dueDate: string,
    category: string
  ) {
    return await this.httpClient.post<TodoTask>(
      'https://localhost:7097/api/TodoTasks',
      new TodoTask(title, description, dueDate, category)
    );
  }

  async updateTodoTask(
    title: string,
    description: string,
    dueDate: string,
    category: string,
    id: number
  ) {
    return await this.httpClient.put<TodoTask>(
      'https://localhost:7097/api/TodoTasks',
      new TodoTask(title, description, dueDate, category, id)
    );
  }

  async deleteTodoTask(id: number) {
    return await this.httpClient.delete<TodoTask>(
      'https://localhost:7097/api/TodoTasks/' + id
    );
  }
}
