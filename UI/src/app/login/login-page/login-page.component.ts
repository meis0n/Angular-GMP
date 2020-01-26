import { Component } from '@angular/core';
import { AuthorizationService } from 'src/app/shared/services/authorization.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { RootState } from 'src/app/store';
import { login } from 'src/app/store/root.actions';
import { selectIsAuthenticated } from 'src/app/store/root.selectors';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { FormControl, FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
  login: string;
  email: string;

  form: FormGroup;

  isAuthenticatedSubscription: Subscription;

  constructor(
    private store: Store<RootState>,
    private router: Router,
    private fb: FormBuilder
    ) {
      this.form = this.fb.group({
        login: ['', [ Validators.required]],
        password: ['', [ Validators.required]],
      });
    }

  ngOnInit(): void {
    this.isAuthenticatedSubscription = this.store.select(selectIsAuthenticated).pipe(
      tap(isAuthenticated => {
        if (isAuthenticated) {
          this.redirectToCourses();
        }
      })
    ).subscribe();
  }

  onLogin(): void {
    this.store.dispatch(login({ payload: {
      login: this.form.get('login').value,
      password: this.form.get('password').value
    }}));
  }

  private redirectToCourses (): void {
    this.router.navigateByUrl('courses');
  }

  ngOnDestroy(): void {
    this.isAuthenticatedSubscription.unsubscribe();
  }
}
