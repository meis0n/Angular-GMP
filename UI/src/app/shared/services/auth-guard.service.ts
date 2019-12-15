import { Injectable } from '@angular/core';
import { AuthorizationService } from './authorization.service';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private authService: AuthorizationService, private router: Router) { }

  async canActivate(): Promise<boolean> {
    const isAuthenticated = await this.authService.isAuthenticated();
    if(!isAuthenticated) {
      this.router.navigateByUrl('login');
    }
    return isAuthenticated;
  }
}
