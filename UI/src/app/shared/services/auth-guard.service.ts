import { Injectable } from '@angular/core';
import { AuthorizationService } from './authorization.service';
import { Router } from '@angular/router';
import { RootState } from 'src/app/store';
import { Store, select } from '@ngrx/store';
import { selectIsAuthenticated } from 'src/app/store/root.selectors';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private store: Store<RootState>, private router: Router) { }

  canActivate() {
    return this.store.pipe(
      select(selectIsAuthenticated),
      tap( isAuthenticated => {
        if(!isAuthenticated) {
          this.router.navigateByUrl('login');
        }
      })
    );
  }
}
