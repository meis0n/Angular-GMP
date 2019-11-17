import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { User } from '../entities/user';
import { USER_LOGIN_DATA_KEY } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  login(user: User): void {
    this.localStorage.set(USER_LOGIN_DATA_KEY, user);
  }
  logout(): void {
    this.localStorage.reset(USER_LOGIN_DATA_KEY);
  }
  isAuthenticated(): boolean {
    const user = this.localStorage.get(USER_LOGIN_DATA_KEY);
    return Boolean(user);
  }
  getCurrentUserInfo(): User | null {
    return this.localStorage.get(USER_LOGIN_DATA_KEY);
  }
  constructor(private localStorage: LocalStorageService) { }
}
