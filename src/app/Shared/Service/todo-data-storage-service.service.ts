import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TodoTask } from '../../todo/todo-task.model';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class TodoDataStorageServiceService {
  constructor(private httpClient: HttpClient) {}

  async getAllTodoTasks() {
    return await this.httpClient.get<TodoTask[]>(environment.todoTaskApi);
  }

  async createTodoTask(
    title: string,
    description: string,
    dueDate: string,
    category: string
  ) {
    return await this.httpClient.post<TodoTask>(
      environment.todoTaskApi,
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
      environment.todoTaskApi,
      new TodoTask(title, description, dueDate, category, id)
    );
  }

  async deleteTodoTask(id: number) {
    return await this.httpClient.delete<TodoTask>(
      environment.todoTaskApi + '/' + id
    );
  }
}
