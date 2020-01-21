import { Injectable } from '@angular/core';

import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthorizationService } from '../services/authorization.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthorizationService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = req.clone({
      body: {
        ...req.body,
        token: this.authService.getToken()
      },
    });

    return next.handle(req);
  }
}
