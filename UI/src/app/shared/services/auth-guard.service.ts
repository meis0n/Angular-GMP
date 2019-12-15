import { Injectable } from '@angular/core';
import { AuthorizationService } from './authorization.service';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private authService: AuthorizationService, private router: Router) { }

  canActivate(): boolean {
    const isAuthenticated = this.authService.isAuthenticated$.getValue();
    if(!isAuthenticated) {
      this.router.navigateByUrl('login');
    }
    return isAuthenticated;
  }
}
