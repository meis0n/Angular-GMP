import { Injectable } from '@angular/core';

import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class BaseUrlInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
     const apiReq = request.clone({ url: `${environment.API_BASE_URL}/${request.url}` });
     return next.handle(apiReq);
  }
}
