import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { Login } from 'src/app/Models/login';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Register } from 'src/app/Models/register';

const baseURL = "https://ecommerce.routemisr.com";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuthenticated = new BehaviorSubject<boolean>(!!localStorage.getItem('token'));
  static isAuthenticated: any;
  constructor(private _httpClient: HttpClient, private _router: Router) { };

  login(data: Login) {
    return this._httpClient.post(baseURL + '/api/v1/auth/signin', data).pipe(
      tap((res: any) => {
        localStorage.setItem('token', res.token)
        this.isAuthenticated.next(true);
      })
    );
  }

  logout() {
    localStorage.removeItem('token')
    this.isAuthenticated.next(false);
    this._router.navigate(['/'])
  }

  register(data: Register | null) {
    return this._httpClient.post(baseURL + '/api/v1/auth/signup', data)
  }
}
