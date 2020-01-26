import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RootState } from '.';

export const selectRootState =
      createFeatureSelector<RootState>("user");

export const selectIsAuthenticated = createSelector(
    selectRootState,
    (user) => {
        return Boolean(user);
    }
);

