import { Component } from '@angular/core';
import { AuthorizationService } from '../../services/authorization.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  public login: string;
  public isAuthenticated: boolean;

  constructor (private authorizationService: AuthorizationService) {}

  async ngOnInit(): Promise<void> {
    this.isAuthenticated = await this.authorizationService.isAuthenticated();
    if(this.isAuthenticated) {
      const user = await this.authorizationService.getCurrentUserInfo();
      this.login = user.login;
    }
  }

  onLogoff(): void {
    console.log('logoff')
  }

  onUserInfo(): void {
    console.log('showUserInfo')
  }
}
