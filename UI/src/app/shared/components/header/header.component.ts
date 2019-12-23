import { Component } from '@angular/core';
import { AuthorizationService } from '../../services/authorization.service';
import { Router } from '@angular/router';
import { User } from '../../entities/user';
import { Observable } from 'rxjs/internal/Observable';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  public userInfo$: Observable<User>;
  public isAuthenticated$: BehaviorSubject<boolean>;

  constructor (
    private authorizationService: AuthorizationService,
    private router: Router,
    ) {}

  async ngOnInit(): Promise<void> {
    this.isAuthenticated$ = this.authorizationService.isAuthenticated$;
    this.userInfo$ = this.authorizationService.getCurrentUserInfo();
  }

  async onLogoff(): Promise<void> {
    await this.authorizationService.logout();
    this.router.navigateByUrl('login');
  }

  onUserInfo(): void {
    console.log('showUserInfo');
  }
}
