import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map, BehaviorSubject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from 'src/app/Models/product';
import { Cart, CartProduct } from 'src/app/Models/cart-product';
import { ToastersService } from '../toasters/toasters.service';
const CART_STORAGE_NAME = 'cartProducts'
@Injectable({
  providedIn: 'root',
})
export class CartService { // Make another APICartService To handle the cart APIs
  cartProducts = new BehaviorSubject<Cart>(
    JSON.parse(<string>localStorage.getItem(CART_STORAGE_NAME)) || {
      _id: '',
      products: [],
      totalCartPrice: 0
    }
  );
  constructor(private httpClient: HttpClient, private _toastersService: ToastersService) { }

  getCartProducts(): Observable<Cart> {
    const NotLoginCart = this.cartProducts.getValue()
    let totalCartPrice = 0;
    NotLoginCart.products?.forEach(prod => {
      let allProductprice = prod.count * prod.price;
      totalCartPrice += allProductprice;
    })
    this.cartProducts.next({ ...NotLoginCart, totalCartPrice })
    console.log("before api", this.cartProducts.getValue());
    localStorage.setItem(CART_STORAGE_NAME, JSON.stringify(this.cartProducts.getValue()));

    this.getLoggedUserCart().subscribe({
      next: (res: Cart) => {
        this.cartProducts.next({
          _id: res._id,
          products: [...res.products, ...this.cartProducts.getValue().products],
          totalCartPrice: res.totalCartPrice + this.cartProducts.getValue().totalCartPrice,
          createdAt: res.createdAt,
          cartOwner: res.cartOwner,
          updatedAt: res.updatedAt,
        })
        localStorage.setItem(CART_STORAGE_NAME, JSON.stringify(this.cartProducts.getValue()));

        NotLoginCart.products.forEach(product=>{
          this.addProductToCart(product._id).subscribe()
        })
        console.log("in api", this.cartProducts.getValue());
      },
      error: (err) => {
        console.log(err);
      }
    })

    return this.cartProducts.asObservable(); // add to the interface or class ohter properties in the API response
  }

  setCartProducts(product: Product): Observable<Cart> {
    const oldCart = this.cartProducts.getValue()
    const currentCart = { ...oldCart }

    const prod = currentCart.products.find((prod) => prod._id === product._id);
    if (prod) {
      prod.count += 1;
      currentCart.totalCartPrice += prod.price
    } else {
      currentCart.products.push({ product, count: 1, _id: product._id, price: product.price });
      currentCart.totalCartPrice += product.price
    }

    console.log(currentCart);
    this.cartProducts.next(currentCart);
    localStorage.setItem(CART_STORAGE_NAME, JSON.stringify(currentCart));
    this._toastersService.showSuccess("added")

    this.addProductToCart(product.id)
      .subscribe({
        next: (res) => {
          console.log("added to database", res);
        },
        error: (err) => {
          if (err.status !== 401) {
            this._toastersService.showFailure()
            this.cartProducts.next(oldCart)
          }
        }
      })

    return this.cartProducts.asObservable()
  }

  RemoveCartProduct(productId: string) {
    let oldCart = this.cartProducts.getValue();
    const newProducts = oldCart.products.filter(prod => prod.product._id != productId)
    let totalCartPrice = 0;
    newProducts.forEach(prod => {
      let allProductprice = prod.count * prod.price;
      totalCartPrice += allProductprice;
    })
    console.log(newProducts);
    
    this.cartProducts.next({
      ...oldCart, products: [...newProducts], totalCartPrice
    });
    console.log(this.cartProducts.getValue());
    
    this._toastersService.showSuccess("removed")

    this.RemoveSpecificCartItem(productId).subscribe({
      next: (res) => {
        console.log(res);
      }, error: (err) => {
        if (err.status !== 401) {
          this._toastersService.showFailure()
          this.cartProducts.next(oldCart)
        }
      }
    })
    localStorage.setItem(CART_STORAGE_NAME, JSON.stringify(this.cartProducts.getValue()));
    return this.cartProducts.asObservable()
  }

  emptyCart() {
    this.cartProducts.next({
      _id: '',
      products: [],
      totalCartPrice: 0,
      createdAt: '',
      cartOwner: '',
      updatedAt: '',
    });
    localStorage.removeItem(CART_STORAGE_NAME);
  }

  addProductToCart(productId: string): Observable<any> {
    const body = {
      productId: productId,
    };
    return this.httpClient.post<any>(
      environment.BASE_URL + '/api/v1/cart',
      body
    )
  }

  getLoggedUserCart(): Observable<Cart> {
    return this.httpClient.get<any>(environment.BASE_URL + '/api/v1/cart').pipe(
      map((res: any) => {
        return res.data;
      })
    );
  }

  RemoveSpecificCartItem(productId: string) {
    return this.httpClient.delete<any>(
      environment.BASE_URL + '/api/v1/cart/' + productId
    )
  }
}
