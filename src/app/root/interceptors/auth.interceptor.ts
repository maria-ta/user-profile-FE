import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { LoginService } from '../services/login.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private loginService: LoginService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return this.loginService.getToken().pipe(
      mergeMap((token) => {
        let requestCloned: HttpRequest<unknown>;

        if (this.shouldHaveToken(request.url) && token) {
          requestCloned = request.clone({
            headers: request.headers.append('Authorization', `Bearer ${token}`)
          });
        } else {
          requestCloned = request;
        }

        return next.handle(requestCloned);
      })
    );
  }

  private shouldHaveToken(url: string): boolean {
    const loginUrl = `${environment.server}authenticate`;
    return url !== loginUrl;
  }
}
