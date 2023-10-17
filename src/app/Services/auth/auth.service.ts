import { Injectable } from '@angular/core';
import { BehaviorSubject, tap, Observable } from 'rxjs';
import { Login } from 'src/app/Models/login';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Register } from 'src/app/Models/register';
import { CartService } from '../cart/cart.service';

const baseURL = "https://ecommerce.routemisr.com";
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuthenticated = new BehaviorSubject<boolean>(!!localStorage.getItem('token'));
  // token = new BehaviorSubject<string>(JSON.stringify(localStorage.getItem('token')));

  constructor(private _httpClient: HttpClient, private _router: Router, private _cartService : CartService) { };

  login(data: Login) {
    return this._httpClient.post(baseURL + '/api/v1/auth/signin', data).pipe(
      tap((res: any) => {
        localStorage.setItem('token', JSON.stringify(res.token)) // it's a string in all cases
        this.isAuthenticated.next(true);
        this._cartService.getCartProducts().subscribe()
      })
    );
  }

  logout() {
    localStorage.removeItem('token')
    this.isAuthenticated.next(false);
    this._cartService.emptyCart();
    this._router.navigate(['/'])
  }

  register(data: Register | null) {
    return this._httpClient.post(baseURL + '/api/v1/auth/signup', data)
  }
}
