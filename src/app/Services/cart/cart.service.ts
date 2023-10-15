import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map, BehaviorSubject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from 'src/app/Models/product';
import { CartProduct } from 'src/app/Models/cart-product';
import { ToastrService } from 'ngx-toastr';
import { ToastersService } from '../toasters/toasters.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartProducts = new BehaviorSubject<CartProduct[]>(
    JSON.parse(<string>localStorage.getItem('cartProducts')) || []
  );
  constructor(private httpClient: HttpClient, private _toastersService: ToastersService) {}
  getCartProducts(): Observable<CartProduct[]> {
    return this.cartProducts.asObservable();
  }

  setCartProducts(product: Product): Observable<any> { // return observable and show notifications
    const currentProducts = this.cartProducts.getValue();
    const prod = currentProducts.find((prod) => prod.product.id === product.id);
    if (prod) {
      prod.count += 1;
    } else {
      currentProducts.push({ product, count: 1 });
    }
    console.log(currentProducts);
    this.cartProducts.next(currentProducts);
    this.addProductToCart(product.id)
      .subscribe({
        next: (res)=>{
          // this._toastersService.showSuccess()
        }, error: (err)=> {
          console.log(err.status);
          if(err.status !== 401){
            return  this._toastersService.showFailure()
          }
        }
      })
    localStorage.setItem('cartProducts', JSON.stringify(currentProducts));
    this._toastersService.showSuccess()
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
      tap(res=> console.log(res) )
    )
  }

  getLoggedUserCart(): Observable<CartProduct[]> {
    return this.httpClient.get<any>(environment.BASE_URL + '/api/v1/cart').pipe(
      map((res) => {
        console.log(res.data);

        let newCartProduct = res.data.products.map((prod: any) => {
          return { count: prod.count, product: prod.product };
        });
        this.cartProducts.next(newCartProduct);
        return res.data;
      })
    );
  }

  RemoveSpecificCartItem(productId: string) {
    return this.httpClient.delete<any>(
      environment.BASE_URL + '/api/v1/cart/' + productId
    );
  }
}
