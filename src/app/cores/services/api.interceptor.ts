import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpStatusCode,
} from '@angular/common/http';

import { AuthService } from './auth.service';
import { CustomToastService } from './custom-toast.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ApiInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private customToastService: CustomToastService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token: string = this.authService.getToken();
    if (token !== '') {
      request = request.clone({
        headers: request.headers.set('Authorization', 'Bearer ' + token),
      });
    }
    return next.handle(request).pipe(
      tap(
        (event: HttpEvent<any>) => {},
        (err) => {
          this.handleError(token, err);
        }
      )
    );
  }

  private handleError(token: string, err: any) {
    if (token !== '' && err.status === HttpStatusCode.Unauthorized) {
      this.customToastService.error(err.error.message);
      this.authService.logout();
    }
    if (token === '' && err.status === HttpStatusCode.Unauthorized && err.url.includes('basicAuth')) {
      this.customToastService.error("Wrong username or password");
      this.authService.logout();
    }
    if (err.status === HttpStatusCode.Forbidden) {
      this.customToastService.error(err.error.message);
    }
  }
}
