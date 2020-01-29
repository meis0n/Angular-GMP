import { Injectable } from '@angular/core';
import { map, mergeMap, catchError, tap, } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { AuthorizationService } from '../shared/services/authorization.service';
import { login, getUserData, setUserData, getUserDataSuccess, logout, ProfileActionTypes } from './root.actions';
import { User } from '../shared/entities/user';
import { TypedAction } from '@ngrx/store/src/models';

@Injectable()
export class RootEffects {
    constructor(private actions: Actions, private authService: AuthorizationService) {}

    public login$ = this.login();
    public logout$ = this.logout();

    public getProfileData$ = this.getProfileData();
    public setProfile$ = this.setProfile();

    private login(): Observable<TypedAction<ProfileActionTypes.GetUserData>> {
        return createEffect(() =>
            this.actions.pipe(
                ofType(login.type),
                mergeMap(({ payload }: { payload: { login: string; email: string }}) =>
                    this.authService.login(payload.login, payload.email).pipe(
                        catchError(() => of(undefined))
                    )
                ),
                map(() => {
                    return getUserData();
                })
            )
        );
    }

    private logout(): Observable<TypedAction<ProfileActionTypes.SetUserData>> {
        return createEffect(() =>
            this.actions.pipe(
                ofType(logout.type),
                tap(() => this.authService.logout()),
                map(() => {
                    return setUserData({ payload: null});
                })
            )
        );
    }

    private getProfileData(): Observable<TypedAction<ProfileActionTypes.GetUserDataSuccess>> {
        return createEffect(() =>
            this.actions.pipe(
                ofType(getUserData.type),
                mergeMap(() =>
                    this.authService.getCurrentUserInfo().pipe(
                        catchError(() => of(undefined))
                    )
                ),
                map((payload: User) => {
                    return getUserDataSuccess({ payload });
                })
            )
        );
    }

    private setProfile(): Observable<TypedAction<ProfileActionTypes.SetUserData>> {
        return createEffect(() =>
            this.actions.pipe(
                ofType(getUserDataSuccess.type),
                map(({ payload }: { payload: User | null }) =>
                    setUserData({ payload })
                )
            )
        );
    }
}
