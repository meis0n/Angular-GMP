import { createAction, props } from '@ngrx/store';
import { User } from '../shared/entities/user';

export enum ProfileActionTypes {
  GetUserData = '[Profile API] GET_USER_DATA',
  GetUserDataSuccess = '[Profile API] GET_USER_DATA_SUCCESS',

  SetUserData = '[Profile] SET_USER_DATA',

  Login = '[Profile API] LOGIN',
  Logout = '[Profile API] LOGOUT',
}

export const getUserData = createAction(
  ProfileActionTypes.GetUserData,
);

export const getUserDataSuccess = createAction(
  ProfileActionTypes.GetUserDataSuccess,
  props<{ payload: User }>()
);

export const setUserData = createAction(
  ProfileActionTypes.SetUserData,
  props<{ payload: User | null }>()
);

export const login = createAction(
  ProfileActionTypes.Login,
  props<{ payload: {
    login: string;
    email: string;
  };}>()
);

export const logout = createAction(
  ProfileActionTypes.Logout,
);
