import { Subscription } from 'rxjs';
import { SharedModule } from './../../shared/shared.module';
import { Component, OnDestroy } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CartService } from 'src/app/Services/cart/cart.service';
import { AuthService } from 'src/app/Services/auth/auth.service';
import { OrdersService } from 'src/app/Services/orders/orders.service';
import { CommonModule } from '@angular/common';
import { Cart, CartProduct } from 'src/app/Models/cart-product';
@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, SharedModule],
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnDestroy{
  cart!: Cart
  cartProducts: CartProduct[] = [];
  isLoading = false;
  apiErrorMsg = '';
  isAuthenticated = false;
  sub! : Subscription
  constructor(
    private _ordersService: OrdersService,
    private _authService: AuthService,
    private _cartService: CartService,
    private _router: Router
  ) {
    this._authService.isAuthenticated.subscribe((isAuth) => {
      this.isAuthenticated = isAuth;
    });
  }

  ngOnInit() {
    this.apiErrorMsg = '';
     this.sub = this._cartService.cartProducts.subscribe((_cart : Cart) => {
        this.cart = _cart
        this.cartProducts = _cart.products;
      });
  }

  onRemove(productId: string) {
    this._cartService.RemoveCartProduct(productId).subscribe((res) => {
      this.cart = res
      this.cartProducts = res.products;
      // this.cart.totalCartPrice = res.totalCartPrice;
      console.log(res, this.cartProducts);
    });
  }
  checkout() {
    if (!this.isAuthenticated) {
      this._router.navigate(['/login'])
      return
    }
    this._ordersService.setCheckoutSession(this.cart._id).subscribe({
      next: (res: any) => {
        console.log(res)
        const location = res.session.url;
        window.location.assign(location)
      },
      error: (err) => console.log(err)
    })
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe()
  }
}
