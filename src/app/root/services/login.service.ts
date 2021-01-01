import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IUser, IUserStringDate } from '../interfaces/user.interface';
import { environment } from '../../../environments/environment';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import * as moment from 'moment';
import { select, Store } from '@ngrx/store';
import { removeToken, setToken } from '../store/actions/token.actions';
import { removeUser, setUser } from '../store/actions/user.actions';
import { selectToken } from '../store/selectors/token.selectors';
import { Router } from '@angular/router';
import { selectUser } from '../store/selectors/user.selectors';

interface LoginResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private readonly loginUrl = `${environment.server}authenticate`;
  private readonly logoutUrl = `${environment.server}api/user/logout`;
  private readonly currentUserUrl = `${environment.server}api/user/current`;
  private readonly userApiUrl = `${environment.server}api/user`;

  private localStorage = localStorage;

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private store: Store<any>
  ) { }

  login(username: string, password: string): Observable<IUser> {
    return this.continueLoginWithToken(this.requestToken(username, password));
  }

  loginWithToken(token: string): Observable<IUser> {
    return this.continueLoginWithToken(of({token}));
  }

  getCurrentUser(): Observable<IUser> {
    return this.httpClient.get<IUserStringDate>(this.currentUserUrl)
      .pipe(
        map((data) => {
          return {
            ...data,
            birthdate: data.birthdate ? moment(data.birthdate) : null,
          };
        })
      );
  }

  updateUser(user: IUser): Observable<any> {
    const url = this.userApiUrl;
    return this.httpClient.put<IUserStringDate>(url,
      {
        ...user,
        birthdate: user.birthdate.format('YYYY-MM-DD')
      }
    )
      .pipe(
        map((data) => {
          return {
            ...data,
            birthdate: data.birthdate ? moment(data.birthdate) : null,
          };
        }),
        tap((updatedUser) => {
          this.setUserToStore(updatedUser);
        })
      );
  }

  createUser(username: string, email: string, password: string): Observable<any> {
    const url = `${this.userApiUrl}/registration`;
    let userWasCreated = false;
    return this.httpClient.post<IUserStringDate>(url,
      {
        username, email, password
      }
    )
      .pipe(
        tap(() => {
          userWasCreated = true;
        }),
        catchError((error) => {
          return error.error === 'User already exists' && userWasCreated ?
            of({}) : throwError(error);
        }),
        mergeMap(() => {
          return this.login(username, password);
        })
      );
  }

  deleteUser(): Observable<any> {
    const url = this.userApiUrl;
    return this.store.pipe(
      select(selectUser),
      mergeMap((user: IUser) => {
        return this.httpClient.delete(url, {
          params: {
            user: user.id
          }
        });
      }),
      tap(() => {
        this.logoutLocal();
      })
    );
  }

  logout(): Observable<any> {
    return this.httpClient.get(this.logoutUrl)
      .pipe(
        tap(() => {
          this.logoutLocal();
        })
      );
  }

  logoutLocal(): void {
    this.removeUserFromStore();
    this.removeTokenFromStore();
    this.removeTokenFromLocalStorage();
  }

  isLoggedIn(): Observable<boolean> {
    return this.getToken().pipe(
      map(token => !!token)
    );
  }

  getToken(): Observable<string> {
    return this.store.pipe(
      select(selectToken),
    );
  }

  getTokenFromLocalStorage(): string {
    return this.localStorage.getItem('token');
  }

  private requestToken(username: string, password: string): Observable<LoginResponse> {
    return this.httpClient.post<LoginResponse>(this.loginUrl, {
      username, password
    });
  }

  private continueLoginWithToken(tokenResponse: Observable<LoginResponse>): Observable<IUser> {
    return tokenResponse.pipe(
      tap((response) => {
        this.setTokenToStore(response.token);
        this.setTokenToLocalStorage(response.token);
      }),
      mergeMap(() => {
        return this.getCurrentUser();
      }),
      tap((user) => {
        this.setUserToStore(user);
      }),
    );
  }

  private setTokenToLocalStorage(token: string): void {
    this.localStorage.setItem('token', token);
  }

  private setTokenToStore(token: string): void {
    this.store.dispatch(setToken({ token }));
  }

  private setUserToStore(user: IUser): void {
    this.store.dispatch(setUser({ user }));
  }

  private removeTokenFromStore(): void {
    this.store.dispatch(removeToken());
  }

  private removeTokenFromLocalStorage(): void {
    this.localStorage.removeItem('token');
  }

  private removeUserFromStore(): void {
    this.store.dispatch(removeUser());
  }
}
