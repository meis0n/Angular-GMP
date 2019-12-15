import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { User } from '../entities/user';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  private BASE_URL = 'auth';
  public isAuthenticated$ = new BehaviorSubject<boolean>(Boolean(this.getToken()));

  async login(login: string, password: string): Promise<void> {
    this.httpClient.post(`${this.BASE_URL}/login`, {
      login,
      password,
    }).subscribe(({ token }: { token: string}) => {
      this.setToken(token);
      this.isAuthenticated$.next(true);
    });
  }
  logout(): void {
    this.localStorage.reset('AUTH');
    this.isAuthenticated$.next(false);
  }

  getCurrentUserInfo(): Observable<User> {
    return this.httpClient.post(`${this.BASE_URL}/userinfo`, {}).pipe(
      map((data: Object): User => ({
          id: data['id'],
          login: data['login'],
          firstName: data['name.first'],
          lastName: data['name.last'],
          email: data['login'],
        })
      )
    );
  }
  private setToken(token: string): void {
    return this.localStorage.set('AUTH', token);
  }
  getToken(): string {
    return this.localStorage.get('AUTH');
  }
  constructor(private localStorage: LocalStorageService, private httpClient: HttpClient) {
    this.isAuthenticated$.next(Boolean(this.getToken()));
  }
}
