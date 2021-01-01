import { AppState } from '../state/app.state';
import { createSelector } from '@ngrx/store';
import { TokenState } from '../state/token.state';

const selectTokenState = (state: AppState): TokenState => state.token;

export const selectToken = createSelector(
  selectTokenState,
  (state: TokenState) => state.token
);
