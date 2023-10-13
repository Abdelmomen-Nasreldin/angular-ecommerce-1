import { AuthService } from 'src/app/Services/auth/auth.service';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {
  constructor() {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = <string>localStorage.getItem("token")
    if (token) {
      const modifiedRequest = req.clone({
        setHeaders: {
          token: JSON.parse(token)
        }
      })
      return next.handle(modifiedRequest);
    }
    return next.handle(req);

  }
}
