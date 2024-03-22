import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private _authService: AuthService) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this._authService.getAccessToken();
    // const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const cloneReq = req.clone({headers:req.headers.set('Authorization', `Bearer ${token}`)});
    return next.handle(cloneReq);
  }
}
