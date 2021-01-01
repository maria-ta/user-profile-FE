import { initialUserState, UserState } from './user.state';
import { initialTokenState, TokenState } from './token.state';

export interface AppState {
  user: UserState;
  token: TokenState;
}

export const initialAppState: AppState = {
  user: initialUserState,
  token: initialTokenState,
};

export function getInitialAppState(): AppState {
  return initialAppState;
}
