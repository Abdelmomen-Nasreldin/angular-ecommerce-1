import { SharedModule } from './../../shared/shared.module';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CartService } from 'src/app/Services/cart/cart.service';
import { AuthService } from 'src/app/Services/auth/auth.service';
import { OrdersService } from 'src/app/Services/orders/orders.service';
import { CommonModule } from '@angular/common';
@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, SharedModule],
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent {
  cartProducts: [] = [];
  products!: any[];
  productId!: string;
  isLoading = false;
  apiErrorMsg = '';
  isAuthenticated = false;
  totalPrice = 0;
  cartId!: string
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
    if (this.isAuthenticated) {
      this.isLoading = true;
      this._cartService
        .getLoggedUserCart()
        // .pipe(
        //   map((products: any) => {
        //     return products.products.map((product: any) => product.product)
        //   })
        // )
        .subscribe({
          next: (res: any) => {
            this.products = res.products;
            this.totalPrice = res.totalCartPrice;
            console.log(res);
            this.cartId = res._id
            this.isLoading = false;

          },
          error: (err) => {
            console.log(err);
            if (err.status == 404) {
              this.apiErrorMsg = "Cart is Empty"
            } else {
              this.apiErrorMsg = err.error.errors.msg;
            }
            this.isLoading = false;
          },
        });
    } else {
      this._cartService.getCartProducts().subscribe((products) => {
        this.products = products;
        // .map(prod=>prod.product);
      });
    }
  }

  onRemove(productId: string) {
    this._cartService.RemoveSpecificCartItem(productId).subscribe((res) => {
      this.products = res.data.products;
      this.totalPrice = res.data.totalCartPrice;
      console.log(res, this.products);
    });
  }
  checkout() {
    if (!this.isAuthenticated) {
      this._router.navigate(['/'])
      return
    }
    this._ordersService.setCheckoutSession(this.cartId).subscribe({
      next: (res: any) => {
        console.log(res)
        const location = res.session.url;
        window.location.assign(location)
      },
      error: (err) => console.log(err)
    })
  }
  
}
