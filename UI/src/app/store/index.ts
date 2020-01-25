import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
  createReducer,
  on,
  Action
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { User } from '../shared/entities/user';
import { setUserData } from './root.actions';


const userReducerFn = createReducer(
  null,
  on(setUserData, (state, { payload }) => {
    return payload ? {
      ...payload
    } : null;
  }),
)


export function profileReducer(
  state = null,
  action: Action
): User {
  return userReducerFn(state, action);
}

export interface RootState {
  user: User | null
}

export const reducers: ActionReducerMap<RootState> = {
  user: profileReducer
};

export const metaReducers: MetaReducer<RootState>[] = !environment.production ? [] : [];
