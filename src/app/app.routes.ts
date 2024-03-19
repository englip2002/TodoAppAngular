import { Routes } from '@angular/router';
import { TodoComponent } from './todo/todo.component';
import { TodoListComponent } from './todo/todo-list/todo-list.component';
import { TodoItemComponent } from './todo/todo-list/todo-item/todo-item.component';
import { TodoDetailsComponent } from './todo/todo-details/todo-details.component';
import { TodoCreateComponent } from './todo/todo-create/todo-create.component';
import { TodoEditComponent } from './todo/todo-edit/todo-edit.component';

export const routes: Routes = [
  { path: 'create', component: TodoCreateComponent },
  {
    path: 'todo',
    component: TodoComponent,
    children: [
      { path: ':index', component: TodoDetailsComponent },
      { path: ':index/edit', component: TodoEditComponent }
    ],
  },
];
