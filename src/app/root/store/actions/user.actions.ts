import { createAction, props } from '@ngrx/store';
import { IUser } from '../../interfaces/user.interface';

export const setUser = createAction('[User] SetUser', props<{user: IUser}>());

export const removeUser = createAction('[User] RemoveUser');
