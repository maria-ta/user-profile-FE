import { AppState } from '../state/app.state';
import { UserState } from '../state/user.state';
import { createSelector } from '@ngrx/store';

const selectUserState = (state: AppState): UserState => state.user;

export const selectUser = createSelector(
  selectUserState,
  (state: UserState) => state.user
);
