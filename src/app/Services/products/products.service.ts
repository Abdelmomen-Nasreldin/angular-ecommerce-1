import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Product } from 'src/app/Models/product';
const BASE_URL = 'https://ecommerce.routemisr.com'
@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private httpClient : HttpClient) { }
getAllProducts() :Observable<Product[]>{
  return this.httpClient.get<any>(BASE_URL + '/api/v1/products').pipe(
    map(res => res.data)
  );
}

getSpecificProduct(id: string) :Observable<Product>{
  return this.httpClient.get<any>(BASE_URL + '/api/v1/products/'+ id).pipe(
    map(res => res.data)
  );
}

}
