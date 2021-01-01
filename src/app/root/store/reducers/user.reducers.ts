import { initialUserState, UserState } from '../state/user.state';

import { Action, createReducer, on } from '@ngrx/store';
import { removeUser, setUser } from '../actions/user.actions';

// tslint:disable-next-line:variable-name
const _userReducer = createReducer(
  initialUserState,
  on(setUser, (state, { user }) => {
    return { user };
  }),
  on(removeUser, (state) => {
    return { user: null };
  }),
);

export function userReducer(state: UserState | undefined, action: Action): UserState {
  return _userReducer(state, action);
}
