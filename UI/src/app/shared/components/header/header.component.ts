import { Component } from '@angular/core';
import { AuthorizationService } from '../../services/authorization.service';
import { Router } from '@angular/router';
import { User } from '../../entities/user';
import { Observable } from 'rxjs/internal/Observable';
import { BehaviorSubject } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { RootState } from 'src/app/store';
import { logout } from 'src/app/store/root.actions';
import { map } from 'rxjs/operators';
import { selectIsAuthenticated } from 'src/app/store/root.selectors';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  public userInfo$: Observable<User>;
  public isAuthenticated$: Observable<boolean>;

  constructor (
    private router: Router,
    private store: Store<RootState>
  ) {}

  async ngOnInit(): Promise<void> {
    this.userInfo$ = this.store.select('user');

    this.isAuthenticated$ = this.store.select(selectIsAuthenticated);
  }

  async onLogoff(): Promise<void> {
    this.store.dispatch(logout());
    this.router.navigateByUrl('login');
  }

  onUserInfo(): void {
    console.log('showUserInfo');
  }
}
