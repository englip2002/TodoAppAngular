import { Route, Routes } from '@angular/router';
import { TodoComponent } from './todo.component';
import { canActivate, canActivateChild } from '../auth/auth.guard';
import { TodoCreateComponent } from './todo-create/todo-create.component';
import { TodoDetailsComponent } from './todo-details/todo-details.component';
import { TodoEditComponent } from './todo-edit/todo-edit.component';

export const TODO_ROUTES: Routes = [
  {
    path: '',
    component: TodoComponent,
    canActivate: [canActivate],
    canActivateChild: [canActivateChild],
    children: [
      { path: 'create', component: TodoCreateComponent },
      { path: ':index', component: TodoDetailsComponent },
      { path: ':index/edit', component: TodoEditComponent },
    ],
  },
];
