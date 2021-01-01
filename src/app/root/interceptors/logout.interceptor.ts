import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {LoginService} from '../services/login.service';
import {Router} from '@angular/router';

@Injectable()
export class LogoutInterceptor implements HttpInterceptor {

  constructor(
    private router: Router,
    private loginService: LoginService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error) => {
        if (error.status === 401) {
          this.loginService.logoutLocal();
          this.router.navigate(['login']);
        }
        return throwError(error);
      })
    );
  }
}
