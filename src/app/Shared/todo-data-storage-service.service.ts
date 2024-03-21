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
    private authService: AuthService
  ) {}

  getAllTodoTasks() {
    // const token = this.authService.getAccessToken();
    const token = this.authService.tokenInformation.access_token;
    const header = new HttpHeaders().set('authorization', `Bearer ${token}`);

    // console.log(header);
    return this.httpClient.get<TodoTask[]>(
      'https://localhost:7097/api/TodoTasks',
      { headers: header }
    );
  }

  // getAllTodoTasks = () => {
  //   return from(
  //     this.authService.getAccessToken()
  //     .then(token => {
  //       const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  //       return this.httpClient.get<TodoTask[]>('https://localhost:7097/api/TodoTasks', { headers: headers });
  //     })
  //   );
  // }

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
