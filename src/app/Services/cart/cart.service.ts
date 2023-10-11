import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';

const BASE_URL = 'https://ecommerce.routemisr.com'

@Injectable({
  providedIn: 'root'
})
export class CartService {

  token = localStorage.getItem("token")
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${this.token}`
  });
  constructor(private httpClient : HttpClient) { }
  addProductToCart(productId : string) :Observable<any>{
 
    const body = {
      productId: productId
    };
    return this.httpClient.post<any>(BASE_URL + '/api/v1/cart',  body, { headers: this.headers });
  }
  
  getLoggedUserCart() :Observable<any>{
    return this.httpClient.get<any>(BASE_URL + '/api/v1/cart', { headers: this.headers }).pipe(
      map(res => res.data)
    );
  }
}
