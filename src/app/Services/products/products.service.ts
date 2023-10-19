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

  products = new BehaviorSubject<Product[]>([])
  
  getProducts() : Observable<Product[]>{
    return this.products.asObservable();
  }

  setProducts(products: Product[] = []) {
    if (products.length > 0) {
      this.products.next(products);
      return this.products.asObservable();
    }
    this.getAllProducts().subscribe({
      next: (res: Product[]) => {
        this.products.next(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
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
