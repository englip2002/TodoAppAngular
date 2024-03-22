import { Component, OnInit } from '@angular/core';
import { TodoTaskService } from '../todo/todo-task.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  constructor(private todoService:TodoTaskService){}

  ngOnInit(): void {
    this.todoService.fetchTodoTasks();
  }
}
