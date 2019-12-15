import { Injectable, Inject } from '@angular/core';

import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class BaseUrlInterceptor implements HttpInterceptor {
  constructor(
     @Inject('BASE_API_URL') private baseUrl: string) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
     const apiReq = request.clone({ url: `${this.baseUrl}/${request.url}` });
     return next.handle(apiReq);
  }
}
