import { Injectable } from '@angular/core';
import {IUser, IUserStringDate} from '../interfaces/user.interface';
import { AppState } from '../store/state/app.state';
import { select, Store } from '@ngrx/store';
import { selectUser } from '../store/selectors/user.selectors';
import { Observable } from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private httpClient: HttpClient,
    private store: Store<AppState>
  ) { }

  getCurrentUser(): Observable<IUser> {
    return this.store.pipe(
      select(selectUser),
    );
  }
}
