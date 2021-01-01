import { AppState } from '../state/app.state';
import { userReducer } from './user.reducers';
import { tokenReducer } from './token.reducers';
import { ActionReducerMap } from '@ngrx/store';

export const appReducers: ActionReducerMap<AppState, any> = {
  user: userReducer,
  token: tokenReducer
};
