import { IUser } from '../../interfaces/user.interface';

export interface TokenState {
  token: string;
}

export const initialTokenState: TokenState = {
  token: null
};
