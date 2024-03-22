import { Routes } from '@angular/router';
import { TodoComponent } from './todo/todo.component';
import { TodoDetailsComponent } from './todo/todo-details/todo-details.component';
import { TodoCreateComponent } from './todo/todo-create/todo-create.component';
import { TodoEditComponent } from './todo/todo-edit/todo-edit.component';
import { SigninRedirectCallbackComponent } from './signin-redirect-callback/signin-redirect-callback.component';
import { SignoutRedirectCallbackComponent } from './signout-redirect-callback/signout-redirect-callback.component';
import { HomeComponent } from './home/home.component';
import { canActivate, canActivateChild } from './auth/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'signin-callback', component: SigninRedirectCallbackComponent },
  { path: 'signout-callback', component: SignoutRedirectCallbackComponent },
  {
    path: 'todo',
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
