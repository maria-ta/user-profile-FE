import { Action, createReducer, on } from '@ngrx/store';
import { initialTokenState, TokenState } from '../state/token.state';
import { removeToken, setToken } from '../actions/token.actions';

// tslint:disable-next-line:variable-name
const _tokenReducer = createReducer(
  initialTokenState,
  on(setToken, (state, { token }) => {
    return { token };
  }),
  on(removeToken, (state) => {
    return { token: null };
  }),
);

export function tokenReducer(state: TokenState | undefined, action: Action): TokenState {
  return _tokenReducer(state, action);
}
