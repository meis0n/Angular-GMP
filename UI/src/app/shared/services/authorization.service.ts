import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { User } from '../entities/user';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { map, tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  private BASE_URL = 'auth';
  private storageKey = 'AUTH';

  login(login: string, password: string): Observable<void> {
    return this.httpClient.post(`${this.BASE_URL}/login`, {
      login,
      password,
    }).pipe(
      tap(({ token }: { token: string}) => {
        this.setToken(token);
      }),
      map(() => null),
    );
  }

  logout(): void {
    this.localStorage.reset(this.storageKey);
  }

  getCurrentUserInfo(): Observable<User> {
    return this.httpClient.post(`${this.BASE_URL}/userinfo`, {
      token: this.getToken(),
    }).pipe(
      map((data: Record<string, any>): User => ({
          id: data['id'],
          login: data['login'],
          firstName: data['name.first'],
          lastName: data['name.last'],
          fullName: `${data['name.first']} ${data['name.last']}`,
          email: data['login'],
        })
      )
    );
  }
  private setToken(token: string): void {
    return this.localStorage.set(this.storageKey, token);
  }
  getToken(): string {
    return this.localStorage.get(this.storageKey);
  }
  constructor(private localStorage: LocalStorageService, private httpClient: HttpClient) {}
}
