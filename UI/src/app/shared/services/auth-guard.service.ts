import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { RootState } from 'src/app/store';
import { Store, select } from '@ngrx/store';
import { selectIsAuthenticated } from 'src/app/store/root.selectors';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private store: Store<RootState>, private router: Router) { }

  canActivate(): Observable<boolean> {
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
