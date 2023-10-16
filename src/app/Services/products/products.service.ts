import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Product } from 'src/app/Models/product';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private httpClient: HttpClient) { }
  // need behavior subject for products => It will be better not using APIs in components

  products = new BehaviorSubject<Product[]>([])
  
  getProducts() : Observable<Product[]>{
    return this.products.asObservable();
  }

  setProducts(products : Product[]){
     this.products.next(products)
     return this.products.asObservable();
  }

  getAllProducts(): Observable<Product[]> {
    return this.httpClient.get<any>(environment.BASE_URL + '/api/v1/products').pipe(
      map(res => res.data)
    );
  }

  getSpecificProduct(id: string): Observable<Product> {
    return this.httpClient.get<any>(environment.BASE_URL + '/api/v1/products/' + id).pipe(
      map(res => res.data)
    );
  }

}
