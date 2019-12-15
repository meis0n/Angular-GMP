import { Component } from '@angular/core';
import { AuthorizationService } from 'src/app/shared/services/authorization.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
  login: string;
  email: string;

  constructor(
    private authorizationService: AuthorizationService,
    private router: Router,
    ) { }

  async ngOnInit(): Promise<void> {
    this.authorizationService.isAuthenticated$.subscribe(isAuthentificated => {
      if (isAuthentificated) {
        this.redirectToCourses();
      }
    });
  }

  async onLogin(): Promise<void> {
    await this.authorizationService.login(
      this.login,
      this.email,
    );
  }

  private redirectToCourses () {
    this.router.navigateByUrl('courses');
  }
}
