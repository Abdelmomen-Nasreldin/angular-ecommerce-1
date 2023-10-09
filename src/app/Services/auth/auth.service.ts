import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { BehaviorSubject } from 'rxjs';
import { Login } from 'src/app/interfaces/login';
import { Register } from 'src/app/interfaces/register';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient, private router: Router) {}
  isLoggedIn = new BehaviorSubject<boolean>(false);
  userData = null;

  tokenDecode(token: string) {
    // let encodedToken = JSON.stringify(localStorage.getItem('userToken'));
    let decodedToken:any = jwtDecode(token);
    if (decodedToken) {
      this.userData = decodedToken;
      this.isLoggedIn.next(true)
      console.log(this.userData);
    }
  }
  saveToken(token: string) {
    localStorage.setItem('userToken', token);
    this.tokenDecode(token);
  }

  register(data: Register | null) {
    return this.httpClient.post(
      'https://ecommerce.routemisr.com/api/v1/auth/signup',
      data
    );
  }
  login(data: Login) {
    return this.httpClient.post(
      'https://ecommerce.routemisr.com/api/v1/auth/signin',
      data
    );
  }

  logout(){
    this.isLoggedIn.next(false);
    localStorage.removeItem("userToken");
    this.userData = null;
    this.router.navigate(['/'])
  }
}
