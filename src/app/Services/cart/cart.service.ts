import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map, BehaviorSubject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from 'src/app/Models/product';
import { CartProduct } from 'src/app/Models/cart-product';
import { ToastersService } from '../toasters/toasters.service';

@Injectable({
  providedIn: 'root',
})
export class CartService { // Make another APICartService To handle the cart APIs
  cartProducts = new BehaviorSubject<CartProduct[]>(
    JSON.parse(<string>localStorage.getItem('cartProducts')) || []
  );
  constructor(private httpClient: HttpClient, private _toastersService: ToastersService) { }

  getCartProducts(): Observable<CartProduct[]> { // add total price to the cartProducts => convert the interface into class and add totalPrice method
    return this.cartProducts.asObservable(); // add to the interface or class ohter properties in the API response
  }

  setCartProducts(product: Product): Observable<CartProduct[]> {
    const currentProducts = this.cartProducts.getValue();
    const newProducts = this.cartProducts.getValue();

    const prod = currentProducts.find((prod) => prod.product.id === product.id);
    if (prod) {
      prod.count += 1;
    } else {
      newProducts.push({ product, count: 1 });
    }

    console.log(newProducts);
    this.cartProducts.next(newProducts);
    localStorage.setItem('cartProducts', JSON.stringify(newProducts));
    this._toastersService.showSuccess()

    this.addProductToCart(product.id)
      .subscribe({
        next: (res) => {},
        error: (err) => {
          console.log(err.status);
          if (err.status !== 401) {
             this._toastersService.showFailure()
             this.cartProducts.next(currentProducts)
          }
        }
      })
   
    return this.cartProducts.asObservable()
  }

  emptyCart() {
    this.cartProducts.next([]);
    localStorage.removeItem('cartProducts');
  }

  addProductToCart(productId: string): Observable<any> {
    const body = {
      productId: productId,
    };
    return this.httpClient.post<any>(
      environment.BASE_URL + '/api/v1/cart',
      body
    ).pipe(
      tap(res => console.log(res))
    )
  }

  getLoggedUserCart(): Observable<CartProduct[]> {
    return this.httpClient.get<any>(environment.BASE_URL + '/api/v1/cart').pipe(
      tap((res) => {
        console.log(res.data);

        let newCartProducts = res.data.products.map((prod: any) => {
          return { count: prod.count, product: prod.product };
        }
        );
        this.cartProducts.next(newCartProducts);
      }),
      map((res) => {
        console.log(res.data);
        return res.data;
      })
    );
  }

  RemoveSpecificCartItem(productId: string) {
    return this.httpClient.delete<any>(
      environment.BASE_URL + '/api/v1/cart/' + productId
    ).pipe(
      tap((res: any) => {
        const newCartProducts = res.data.products.map((cartProd: any) => {
          return { count: cartProd.count, product: cartProd.product }
        });
        this.cartProducts.next(newCartProducts)
      })
    );
  }
}
