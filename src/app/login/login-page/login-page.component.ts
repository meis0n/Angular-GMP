import { Component } from '@angular/core';
import { AuthorizationService } from 'src/app/shared/services/authorization.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
  login: string;
  email: string;

  constructor(private authorizationService: AuthorizationService) { }

  async onLogin(): Promise<void> {
    await this.authorizationService.login({
      id: '123',
      firstName: '123',
      login: this.login,
      lastName: '123',
      email: this.email,
    });
    console.log('Success login', { login: this.login, email: this.email});
  }

}
