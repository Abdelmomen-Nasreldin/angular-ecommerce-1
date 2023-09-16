import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private httpClient : HttpClient) { }
getProducts() :Observable<any>{
  return this.httpClient.get<any>('https://ecommerce.routemisr.com/api/v1/products');
}
}
