import { Component } from '@angular/core';
import { AuthorizationService } from '../../services/authorization.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  public login: string;
  public isAuthenticated: boolean;

  constructor (
    private authorizationService: AuthorizationService,
    private router: Router,
    ) {}

  async ngOnInit(): Promise<void> {
    this.isAuthenticated = await this.authorizationService.isAuthenticated();
    if(this.isAuthenticated) {
      const user = await this.authorizationService.getCurrentUserInfo();
      this.login = user.login;
    }
  }

  async onLogoff(): Promise<void> {
    await this.authorizationService.logout();
    this.isAuthenticated = await this.authorizationService.isAuthenticated();
    this.router.navigateByUrl('login');
  }

  onUserInfo(): void {
    console.log('showUserInfo');
  }
}
