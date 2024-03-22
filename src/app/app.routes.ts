import { Routes } from '@angular/router';
import { SigninRedirectCallbackComponent } from './signin-redirect-callback/signin-redirect-callback.component';
import { SignoutRedirectCallbackComponent } from './signout-redirect-callback/signout-redirect-callback.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'signin-callback', component: SigninRedirectCallbackComponent },
  { path: 'signout-callback', component: SignoutRedirectCallbackComponent },
  {
    //lazy loading
    path: 'todo',
    loadChildren: () => import('./todo/todo-route').then((m) => m.TODO_ROUTES),
  },
  // {
  //   path: 'todo',
  //   component: TodoComponent,
  //   canActivate: [canActivate],
  //   canActivateChild: [canActivateChild],
  //   children: [
  //     { path: 'create', component: TodoCreateComponent },
  //     { path: ':index', component: TodoDetailsComponent },
  //     { path: ':index/edit', component: TodoEditComponent },
  //   ],
  // },
];
