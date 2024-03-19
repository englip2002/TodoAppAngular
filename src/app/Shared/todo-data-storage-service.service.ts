import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TodoTask } from '../todo/todo-task.model';

@Injectable({
  providedIn: 'root',
})
export class TodoDataStorageServiceService {
  constructor(private httpClient: HttpClient) {}

  getAllTodoTasks() {
    return this.httpClient.get<TodoTask[]>(
      'https://localhost:7097/api/TodoTasks'
    );
  }

  createTodoTask(
    title: string,
    description: string,
    dueDate: string,
    category: string
  ) {
    return this.httpClient.post<TodoTask>(
      'https://localhost:7097/api/TodoTasks',
      new TodoTask(title, description, dueDate, category)
    );
  }

  updateTodoTask(
    title: string,
    description: string,
    dueDate: string,
    category: string,
    id: number
  ) {
    return this.httpClient.put<TodoTask>(
      'https://localhost:7097/api/TodoTasks',
      new TodoTask(title, description, dueDate, category, id)
    );
  }

  deleteTodoTask(id: number) {
    return this.httpClient.delete<TodoTask>(
      'https://localhost:7097/api/TodoTasks/' + id
    );
  }
}
