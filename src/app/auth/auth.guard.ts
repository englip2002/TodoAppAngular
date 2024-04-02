import { inject, Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateChildFn,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class PermissionsService {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    //your logic goes here
    return this.authService.isAuthenticated().then((authenticated: boolean) => {
      if (authenticated){
        return true;
      }
      else {
        this.router.navigate(['/']);
        return false;
      }
    });
  }
}

export const canActivateChild: CanActivateChildFn = (
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) : Observable<boolean> | Promise<boolean> | boolean => {
  return inject(PermissionsService).canActivate(next, state);
}

export const canActivate: CanActivateFn = (
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<boolean> | Promise<boolean> | boolean => {
  return inject(PermissionsService).canActivate(next, state);
};
