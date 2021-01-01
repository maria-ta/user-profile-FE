import { createAction, props } from '@ngrx/store';

export const setToken = createAction('[Token] SetToken', props<{token: string}>());

export const removeToken = createAction('[Token] RemoveToken');
