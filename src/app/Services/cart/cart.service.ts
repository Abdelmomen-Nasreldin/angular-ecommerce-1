import { AuthService } from 'src/app/Services/auth/auth.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from 'src/app/Models/product';
import { CartProduct } from 'src/app/Models/cart-product';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartProducts = new BehaviorSubject<CartProduct[]>(
    JSON.parse(<string>localStorage.getItem('cartProducts')) || []
  );

  getCartProducts(): Observable<CartProduct[]> {
    return this.cartProducts.asObservable();
  }

  setCartProducts(product: Product): void {
    const currentProducts = this.cartProducts.getValue();
    const prod = currentProducts.find((prod) => prod.product.id === product.id);
    if (prod) {
      prod.count += 1;
    } else {
      currentProducts.push({ product, count: 1 });
    }
    console.log(currentProducts);
    this.cartProducts.next(currentProducts);
    localStorage.setItem('cartProducts', JSON.stringify(currentProducts));
  }
emptyCart(){
  this.cartProducts.next([]);
  localStorage.removeItem("cartProducts")
}
  isAuthenticated: boolean;
  constructor(
    private httpClient: HttpClient,
    private _authService: AuthService
  ) {
    this.isAuthenticated = this._authService.isAuthenticated.getValue();
  }

  addProductToCart(productId: string): Observable<any> {
    const body = {
      productId: productId,
    };
    return this.httpClient.post<any>(
      environment.BASE_URL + '/api/v1/cart',
      body
    );
  }

  getLoggedUserCart(): Observable<Product[]> {
    return this.httpClient.get<any>(environment.BASE_URL + '/api/v1/cart').pipe(
      map((res) => {
        // console.log(res.data);
        // console.log(res.data.products.map((prod: any)=>{
        //   return {count: prod.count,product: prod.product}
        // }));
        let newCartProduct = res.data.products.map((prod: any) => {
          return { count: prod.count, product: prod.product };
        });
        this.cartProducts.next(newCartProduct);
        return res.data.products;
      })
    );
  }
}
